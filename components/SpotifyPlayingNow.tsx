import Link from "next/link";
import { getNowPlaying, getRecentTrack } from "utils/spotify";
import { SpotifyIcon } from "./SocialIcons";

async function getSpotifyPlayingNow() {
  let response = await getNowPlaying();

  let song = null;
  let isPlaying = false;
  let title = null;
  let artist = null;
  let album = null;
  let albumImageUrl = null;
  let songUrl = null;

  if (response.status === 204 || response.status > 400) {
    response = await getRecentTrack();
    response = await response.json();
    song = (response as any).items[0].track;
    title = song.name;
    artist = song.artists.map((artist: any) => artist.name).join(", ");
    album = song.album.name;
    albumImageUrl = song.album.images[0].url;
    songUrl = song.external_urls.spotify;
  } else {
    song = await response.json();
    isPlaying = song.is_playing;
    title = song.item.name;
    artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
    album = song.item.album.name;
    albumImageUrl = song.item.album.images[0].url;
    songUrl = song.item.external_urls.spotify;
  }

  return {
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  };
}

export default async function SpotifyPlayingNow(): Promise<JSX.Element> {
  //   const { data, error } = useSWR("/api/spotify-playing-now", fetcher);
  const data = await getSpotifyPlayingNow();

  return (
    <div className="mb-8">
      <div className="max-w-3xl inline-flex">
        <div>
          <SpotifyIcon className="h-4 w-4 mt-1 mr-2" />
        </div>
        <div>
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
    </div>
  );
}
