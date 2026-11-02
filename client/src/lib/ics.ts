/**
 * Minimal iCalendar (.ics) generator for the publication launch.
 * Times are local to Europe/Berlin and the VTIMEZONE block is included,
 * so calendar apps convert them correctly from any time zone.
 */

export type CalendarEvent = {
  uid: string;
  title: string;
  description?: string;
  location: string;
  url?: string;
  /** Local wall-clock time in `timeZone`, format YYYYMMDDTHHMMSS */
  start: string;
  end: string;
  timeZone: "Europe/Berlin";
};

export const LAUNCH_EVENT: CalendarEvent = {
  uid: "remnants-of-a-future-launch-20261118@various-degrees",
  title: "Remnants of a Future — Publication launch",
  description:
    "Celebrate the first issue of Remnants of a Future, the debut publication from Various Degrees. RSVP: https://luma.com/zclqrs5o",
  location: "desirelines books, Fraenkelufer 28, 10999 Berlin",
  url: "https://luma.com/zclqrs5o",
  start: "20261118T183000",
  end: "20261118T210000",
  timeZone: "Europe/Berlin",
};

const BERLIN_VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Berlin",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

/** Escape text values per RFC 5545 §3.3.11 */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Fold lines longer than 75 octets (RFC 5545 §3.1) */
function fold(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    const limit = parts.length === 0 ? 75 : 74; // continuation lines start with a space
    if (currentBytes + bytes > limit) {
      parts.push(current);
      current = "";
      currentBytes = 0;
    }
    current += char;
    currentBytes += bytes;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function buildIcs(event: CalendarEvent, now: Date = new Date()): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Various Degrees//Remnants of a Future//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...BERLIN_VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART;TZID=${event.timeZone}:${event.start}`,
    `DTEND;TZID=${event.timeZone}:${event.end}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.location)}`,
    ...(event.description ? [`DESCRIPTION:${escapeText(event.description)}`] : []),
    ...(event.url ? [`URL:${event.url}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

/** A data: URI that works as an `href` with the `download` attribute. */
export function icsDataUri(event: CalendarEvent): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(event))}`;
}
