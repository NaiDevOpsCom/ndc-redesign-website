import ICAL from "ical.js";

// Type for ICAL Time to avoid 'any' usage
type ICALTime = {
  toJSDate: () => Date;
  timezone?: string;
  zone?: {
    tzid: string;
  };
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
  timezone?: string;
}

// webcal://api.luma.com/ics/get?entity=calendar&id=cal-fFX28aaHRNQkThJ

const LUMA_CALENDAR_ID = "cal-fFX28aaHRNQkThJ";
const LUMA_CALENDAR_URL = `/api/luma/ics/get?entity=calendar&id=${LUMA_CALENDAR_ID}`;

/**
 * Extract URL from Luma event description if not in URL field
 * Luma often includes the event URL in the description
 */
function extractUrlFromDescription(description: string): string | undefined {
  if (!description) return undefined;

  // Match Luma event URLs
  const lumaUrlMatch = description.match(/https:\/\/lu\.ma\/[a-zA-Z0-9-_]+/i);
  if (lumaUrlMatch) return lumaUrlMatch[0];

  // Match generic URLs in description (using simplified regex)
  const urlMatch = description.match(/https?:\/\/\S+/i);
  if (urlMatch) return urlMatch[0];

  return undefined;
}

export async function fetchLumaEvents(): Promise<LumaEvent[]> {
  const response = await fetch(LUMA_CALENDAR_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.statusText}`);
  }

  const icsData = await response.text();
  const jcalData = ICAL.parse(icsData);
  const component = new ICAL.Component(jcalData);
  const events = component.getAllSubcomponents("vevent");

  return events
    .map((event): LumaEvent | null => {
      const summary = event.getFirstPropertyValue("summary")?.toString() || "Untitled Event";
      const description = event.getFirstPropertyValue("description")?.toString() || "";

      const start = event.getFirstPropertyValue("dtstart") as unknown as ICALTime | null;
      if (!start || typeof start.toJSDate !== "function") return null;

      const end = event.getFirstPropertyValue("dtend") as unknown as ICALTime | null;

      const startJs = start.toJSDate();
      const endJs = end && typeof end.toJSDate === "function" ? end.toJSDate() : startJs;

      const location = event.getFirstPropertyValue("location")?.toString();
      let url = event.getFirstPropertyValue("url")?.toString();

      // Use a deterministic fallback for the UID
      const uid =
        event.getFirstPropertyValue("uid")?.toString() || `${summary}-${startJs.toISOString()}`;

      // Correctly get the ICAL.Property object to safely call getValues()
      const categoriesProperty = event.getFirstProperty("categories");
      const categories = categoriesProperty
        ? categoriesProperty.getValues().map((v: unknown) => String(v))
        : [];

      // If no URL field, try to extract from description
      if (!url && description) {
        url = extractUrlFromDescription(description);
      }

      return {
        title: summary,
        description,
        startDate: startJs.toISOString(),
        endDate: endJs.toISOString(),
        location,
        url,
        uid,
        categories,
        timezone:
          start.zone?.tzid || (typeof start.timezone === "string" ? start.timezone : undefined),
      };
    })
    .filter((event): event is LumaEvent => {
      if (!event) return false;
      // Only include events that are currently active or in the future
      const eventEndDate = new Date(event.endDate);
      const now = new Date();
      return eventEndDate >= now;
    })
    .sort((a: LumaEvent, b: LumaEvent) => {
      // Sort by date, soonest first
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
}
