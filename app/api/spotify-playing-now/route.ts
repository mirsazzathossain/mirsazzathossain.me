import { NextResponse } from "next/server";

import { getNowPlaying, getRecentTrack } from "utils/spotify";

export async function GET() {
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

  return NextResponse.json(
    {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
      status: 200,
    }
  );
}
