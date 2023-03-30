import { NextResponse } from "next/server";
import { getEvents } from "utils/calendar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = new Date(searchParams.get("start") as string);
  const end = new Date(searchParams.get("end") as string);

  const events = await getEvents(start, end);
  return NextResponse.json(events, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
    status: 200,
  });
}
