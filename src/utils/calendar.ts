export const getEvents = async (start: Date, end: Date) => {
  const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
  const CALENDER_ID = process.env.GOOGLE_CALENDAR_ID;

  const EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDER_ID}/events?`;

  const COLORS_ENDPOINT = `https://www.googleapis.com/calendar/v3/colors?key=${API_KEY}`;

  const offset = new Date().getTimezoneOffset() * 60000;
  const apiStart = new Date(start.getTime() - offset - 86400000);
  const apiEnd = new Date(end.getTime() - offset + 86400000);
  const startISO = apiStart.toISOString();
  const endISO = apiEnd.toISOString();

  const finalUrl = `${EVENTS_ENDPOINT}timeMin=${startISO}&timeMax=${endISO}&singleEvents=true&key=${API_KEY}`;
  const events = await fetch(finalUrl);
  const colors = await fetch(COLORS_ENDPOINT);

  const events_response = await events.json();
  const colors_response = await colors.json();

  const filteredEvents: CalEvent[] = events_response.items.map((event: any) => {
    // check if the event has a colorId
    // if it doesn't, use the default color
    if (!event.colorId) {
      event.colorId = "1";
    }
    const color = colors_response.event[event.colorId];
    const newEvent: CalEvent = {
      title: event.summary,
      description: event.description,
      location: event.location,
      date: event.start.date || event.start.dateTime.split("T")[0],
      startTime: event.start.dateTime
        ? event.start.dateTime.split("T")[1].split("-")[0]
        : "",
      endTime: event.end.dateTime
        ? event.end.dateTime.split("T")[1].split("-")[0]
        : "",
      color: {
        id: event.colorId,
        foreground: color.foreground,
        background: color.background,
      },
      link: event.htmlLink,
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
