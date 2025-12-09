import ICAL from 'ical.js';

export interface LumaEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  url?: string;
  uid: string;
}

// webcal://api.luma.com/ics/get?entity=calendar&id=cal-fFX28aaHRNQkThJ

const LUMA_CALENDAR_ID = 'cal-fFX28aaHRNQkThJ';
const LUMA_CALENDAR_URL = import.meta.env.DEV
  ? `/api/luma/ics/get?entity=calendar&id=${LUMA_CALENDAR_ID}`
  : `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.luma.com/ics/get?entity=calendar&id=${LUMA_CALENDAR_ID}`)}`;

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

    return events.map((event: any) => {
      const summary = event.getFirstPropertyValue('summary')?.toString() || 'Untitled Event';
      const description = event.getFirstPropertyValue('description')?.toString() || '';
      const startDate = event.getFirstPropertyValue('dtstart');
      const endDate = event.getFirstPropertyValue('dtend');
      const location = event.getFirstPropertyValue('location')?.toString();
      const url = event.getFirstPropertyValue('url')?.toString();
      const uid = event.getFirstPropertyValue('uid')?.toString() || Math.random().toString(36).substring(2, 9);

      return {
        title: summary,
        description,
        startDate: startDate.toJSDate().toISOString(),
        endDate: endDate?.toJSDate().toISOString() || startDate.toJSDate().toISOString(),
        location,
        url,
        uid
      };
    }).filter((event: LumaEvent) => {
      // Only include future events or events from the last 30 days
      const eventDate = new Date(event.startDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return eventDate >= thirtyDaysAgo;
    }).sort((a: LumaEvent, b: LumaEvent) => {
      // Sort by date, soonest first
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  } catch (error) {
    console.error('Error fetching Luma events:', error);
    return [];
  }
}
