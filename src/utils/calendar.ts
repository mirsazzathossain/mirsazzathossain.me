export const getEvents = async (start: Date, end: Date) => {
  const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
  const CALENDER_ID = process.env.GOOGLE_CALENDAR_ID;

  if (!API_KEY || !CALENDER_ID) {
    throw new Error("GOOGLE_CALENDAR_API_KEY and GOOGLE_CALENDAR_ID must be set");
  }

  const EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDER_ID}/events?`;

  const COLORS_ENDPOINT = `https://www.googleapis.com/calendar/v3/colors?key=${API_KEY}`;

  const offset = new Date().getTimezoneOffset() * 60000;
  const apiStart = new Date(start.getTime() - offset - 86400000);
  const apiEnd = new Date(end.getTime() - offset + 86400000);
  const startISO = apiStart.toISOString();
  const endISO = apiEnd.toISOString();

  const finalUrl = `${EVENTS_ENDPOINT}timeMin=${startISO}&timeMax=${endISO}&singleEvents=true&key=${API_KEY}`;

  const [eventsRes, colorsRes] = await Promise.all([fetch(finalUrl), fetch(COLORS_ENDPOINT)]);

  if (!eventsRes.ok) {
    throw new Error(
      `Google Calendar events API error: ${eventsRes.status} ${eventsRes.statusText}`,
    );
  }
  if (!colorsRes.ok) {
    throw new Error(
      `Google Calendar colors API error: ${colorsRes.status} ${colorsRes.statusText}`,
    );
  }

  const events_response = await eventsRes.json();
  const colors_response = await colorsRes.json();

  const items: unknown[] = events_response.items ?? [];
  const eventColors = colors_response.event ?? {};

  const filteredEvents: CalEvent[] = items
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((event) => {
      const colorId = typeof event.colorId === "string" ? event.colorId : "1";
      const color = (eventColors[colorId] as
        { foreground: string; background: string } | undefined) ?? {
        foreground: "#000000",
        background: "#ffffff",
      };

      const start = event.start as { date?: string; dateTime?: string } | undefined;
      const end = event.end as { date?: string; dateTime?: string } | undefined;

      const newEvent: CalEvent = {
        title: typeof event.summary === "string" ? event.summary : "",
        description: typeof event.description === "string" ? event.description : undefined,
        location: typeof event.location === "string" ? event.location : undefined,
        date: start?.date ?? start?.dateTime?.split("T")[0] ?? "",
        startTime: start?.dateTime ? start.dateTime.split("T")[1].split("-")[0] : "",
        endTime: end?.dateTime ? end.dateTime.split("T")[1].split("-")[0] : "",
        color: {
          id: colorId,
          foreground: color.foreground,
          background: color.background,
        },
        link: typeof event.htmlLink === "string" ? event.htmlLink : "",
      };
      return newEvent;
    });

  const response: Day[] = [];

  const days = Math.floor((end.getTime() - start.getTime()) / 86400000);
  for (let i = 1; i <= days + 1; i++) {
    const date = new Date(start.getTime() + i * 86400000);
    response.push({
      date: date.toISOString().split("T")[0],
      events: [],
    });
  }

  filteredEvents.forEach((event) => {
    const index = response.findIndex((day) => day.date === event.date);
    if (index !== -1) {
      response[index].events.push(event);
    }
  });

  return response;
};
