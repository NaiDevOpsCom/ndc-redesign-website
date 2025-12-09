import ICAL from 'ical.js';

// Type for ICAL Time to avoid 'any' usage
type ICALTime = {
  toJSDate: () => Date;
};

export interface LumaEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  url?: string;
  uid: string;
  categories?: string[];
}

// webcal://api.luma.com/ics/get?entity=calendar&id=cal-fFX28aaHRNQkThJ

const LUMA_CALENDAR_ID = 'cal-fFX28aaHRNQkThJ';
const LUMA_CALENDAR_URL = import.meta.env.DEV
  ? `/api/luma/ics/get?entity=calendar&id=${LUMA_CALENDAR_ID}`
  : `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.luma.com/ics/get?entity=calendar&id=${LUMA_CALENDAR_ID}`)}`;

/**
 * Extract URL from Luma event description if not in URL field
 * Luma often includes the event URL in the description
 */
function extractUrlFromDescription(description: string): string | undefined {
  if (!description) return undefined;

  // Match Luma event URLs
  const lumaUrlMatch = description.match(/https:\/\/lu\.ma\/[a-zA-Z0-9-_]+/i);
  if (lumaUrlMatch) return lumaUrlMatch[0];

  // Match generic URLs in description
  const urlMatch = description.match(/https?:\/\/[^\s]+/i);
  if (urlMatch) return urlMatch[0];

  return undefined;
}

export async function fetchLumaEvents(): Promise<LumaEvent[]> {
  try {
    const response = await fetch(LUMA_CALENDAR_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.statusText}`);
    }

    const icsData = await response.text();
    const jcalData = ICAL.parse(icsData);
    const component = new ICAL.Component(jcalData);
    const events = component.getAllSubcomponents('vevent');

    return events
      .map((event) => {
        const summary = event.getFirstPropertyValue('summary')?.toString() || 'Untitled Event';
        const description = event.getFirstPropertyValue('description')?.toString() || '';
        const startDate = event.getFirstPropertyValue('dtstart') as ICALTime;
        const endDate = event.getFirstPropertyValue('dtend') as ICALTime | null;
        const location = event.getFirstPropertyValue('location')?.toString();
        let url = event.getFirstPropertyValue('url')?.toString();
        const uid = event.getFirstPropertyValue('uid')?.toString() || Math.random().toString(36).substring(2, 9);
        const categoriesProp = event.getFirstPropertyValue('categories');
        const categories = Array.isArray(categoriesProp) ? categoriesProp.map((v) => v.toString()) : [];

        // If no URL field, try to extract from description
        if (!url && description) {
          url = extractUrlFromDescription(description);
        }

        return {
          title: summary,
          description,
          startDate: startDate.toJSDate().toISOString(),
          endDate: endDate?.toJSDate().toISOString() || startDate.toJSDate().toISOString(),
          location,
          url,
          uid,
          categories,
        };
      })
      .filter((event: LumaEvent) => {
        // Only include future events or events from the last 30 days
        const eventDate = new Date(event.startDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return eventDate >= thirtyDaysAgo;
      })
      .sort((a: LumaEvent, b: LumaEvent) => {
        // Sort by date, soonest first
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
  } catch (error) {
    console.error('Error fetching Luma events:', error);
    return [];
  }
}
