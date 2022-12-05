"use client";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { Container } from "./Container";
import { SpotifyIcon } from "./SocialIcons";

export default function SpotifyPlayingNow() {
  const { data, error } = useSWR("/api/spotify-playing-now", fetcher);

  return (
    <Container className="mb-4">
      <div className="max-w-3xl inline-flex">
        <div>
          <SpotifyIcon className="h-4 w-4 mt-1 mr-2" />
        </div>
        <div>
          {error && <div> Failed to load</div>}
          {!data && <div> Loading...</div>}
          {data && data.isPlaying && (
            <p className="text-sm text-zinc-800 dark:text-zinc-100">
              <Link
                href={data.songUrl}
                className="text-zinc-800 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-500 font-semibold"
              >
                {data.title}
              </Link>{" "}
              <span className="text-zinc-600 dark:text-zinc-400">by</span>{" "}
              <span className="font-semibold">{data?.artist ?? "Spotify"}</span>{" "}
              ▶️
            </p>
          )}
          {data && !data.isPlaying && (
            <p className="text-sm text-zinc-800 dark:text-zinc-100">
              <Link
                href={data.songUrl}
                target="_blank"
                className="text-zinc-800 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-500 font-semibold"
              >
                {data.title}
              </Link>{" "}
              <span className="text-zinc-600 dark:text-zinc-400">by</span>{" "}
              <span className="font-semibold">{data?.artist ?? "Spotify"}</span>{" "}
              ⏸️
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
