"""
Fetches free/busy data from Google Calendar for the current Mon–Sun week
and rewrites src/data/availability.json.

Auth: uses a Google API key (read-only, works when the calendar has public
free/busy visibility). No service-account needed.

Env vars (GitHub secrets or .env):
  GOOGLE_API_KEY       — Google Cloud API key with Calendar API enabled
                         (same key as PUBLIC_GOOGLE_API_KEY in .env)
  GOOGLE_CALENDAR_IDS  — comma-separated "calendarId:color" pairs
                         (same format as PUBLIC_GOOGLE_CALENDAR_IDS in .env)
                         Only the personal calendar (first non-holiday id) is
                         used for free/busy; holidays are skipped.
"""

import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

from googleapiclient.discovery import build

# ── config ────────────────────────────────────────────────────────────────────

TZ = ZoneInfo("Asia/Dhaka")

HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23]
HOUR_LABELS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "9pm", "10pm", "11pm"]
DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

DATA_FILE = Path(__file__).parents[2] / "src" / "data" / "availability.json"

# ── helpers ───────────────────────────────────────────────────────────────────

def load_env_file():
    """Load .env from repo root when running locally (not in CI)."""
    env_file = Path(__file__).parents[2] / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key not in os.environ:
            os.environ[key] = value


def resolve_credentials() -> tuple[str, list[str]]:
    """Return (api_key, [calendar_ids]) from env, accepting both naming styles."""
    api_key = (
        os.environ.get("GOOGLE_API_KEY")
        or os.environ.get("PUBLIC_GOOGLE_API_KEY")
        or ""
    )
    raw_ids = (
        os.environ.get("GOOGLE_CALENDAR_IDS")
        or os.environ.get("PUBLIC_GOOGLE_CALENDAR_IDS")
        or ""
    )

    # Parse "id:color,id:color" → just the ids, skip public holiday calendars
    calendar_ids = [
        part.split(":")[0]
        for part in raw_ids.split(",")
        if part.strip() and "holiday" not in part.lower()
    ]

    return api_key, calendar_ids


def current_week_bounds() -> tuple[datetime, datetime]:
    now = datetime.now(TZ)
    monday = (now - timedelta(days=now.weekday())).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    sunday = monday + timedelta(days=7)          # exclusive upper bound
    return monday, sunday


def fetch_busy_ranges(service, calendar_ids: list[str], monday: datetime, sunday: datetime):
    body = {
        "timeMin": monday.isoformat(),
        "timeMax": sunday.isoformat(),
        "timeZone": "Asia/Dhaka",
        "items": [{"id": cid} for cid in calendar_ids],
    }
    result = service.freebusy().query(body=body).execute()

    ranges: list[tuple[datetime, datetime]] = []
    for cid in calendar_ids:
        for block in result.get("calendars", {}).get(cid, {}).get("busy", []):
            start = datetime.fromisoformat(block["start"]).astimezone(TZ)
            end   = datetime.fromisoformat(block["end"]).astimezone(TZ)
            ranges.append((start, end))
    return ranges


def slot_is_busy(day_offset: int, hour: int, monday: datetime, busy: list) -> bool:
    slot_start = monday + timedelta(days=day_offset, hours=hour)
    slot_end   = slot_start + timedelta(hours=1)
    return any(s < slot_end and e > slot_start for s, e in busy)


def build_grid(monday: datetime, busy: list) -> list[str]:
    return [
        "".join(
            "b" if slot_is_busy(d, h, monday, busy) else "f"
            for d in range(7)
        )
        for h in HOURS
    ]


def format_range_label(monday: datetime, sunday_ex: datetime) -> str:
    sunday = sunday_ex - timedelta(seconds=1)
    if monday.month == sunday.month:
        return f"{monday.strftime('%b %-d')} – {sunday.strftime('%-d, %Y')}"
    return f"{monday.strftime('%b %-d')} – {sunday.strftime('%b %-d, %Y')}"


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    load_env_file()

    api_key, calendar_ids = resolve_credentials()

    if not api_key:
        print("ERROR: GOOGLE_API_KEY (or PUBLIC_GOOGLE_API_KEY) not set.")
        sys.exit(1)
    if not calendar_ids:
        print("ERROR: GOOGLE_CALENDAR_IDS (or PUBLIC_GOOGLE_CALENDAR_IDS) not set.")
        sys.exit(1)

    print(f"Using calendars: {calendar_ids}")

    monday, sunday_ex = current_week_bounds()
    print(f"Week: {monday.strftime('%Y-%m-%d')} → {(sunday_ex - timedelta(days=1)).strftime('%Y-%m-%d')} (Dhaka)")

    service = build("calendar", "v3", developerKey=api_key, cache_discovery=False)

    try:
        busy = fetch_busy_ranges(service, calendar_ids, monday, sunday_ex)
    except Exception as e:
        print(f"ERROR fetching free/busy: {e}")
        print(
            "Tip: make sure each calendar has 'Make available to public' → "
            "'See only free/busy information' enabled in Google Calendar settings."
        )
        sys.exit(1)

    print(f"Found {len(busy)} busy block(s)")

    grid  = build_grid(monday, busy)
    dates = [(monday + timedelta(days=i)).strftime("%b %-d") for i in range(7)]

    output = {
        "tz": "Asia/Dhaka · UTC+6",
        "rangeLabel": format_range_label(monday, sunday_ex),
        "days": DAY_LABELS,
        "dates": dates,
        "hours": HOUR_LABELS,
        "grid": grid,
    }

    current = None
    if DATA_FILE.exists():
        with DATA_FILE.open() as f:
            current = json.load(f)

    if current == output:
        print("No change.")
        return

    with DATA_FILE.open("w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Written: {format_range_label(monday, sunday_ex)}")


if __name__ == "__main__":
    main()