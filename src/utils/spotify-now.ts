import { getNowPlaying, getRecentTrack } from "@/utils/spotify";

export type SpotifyNowData = {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  songUrl: string | null;
};

export async function fetchSpotifyNow(): Promise<SpotifyNowData | null> {
  try {
    const response = await getNowPlaying();

    let song = null;
    let isPlaying = false;
    let title = null;
    let artist = null;
    let album = null;
    let albumImageUrl = null;
    let songUrl = null;

    if (response.status === 204 || response.status >= 400) {
      const recentResponse = await getRecentTrack();
      if (recentResponse.status >= 400) return null;
      const recentData = await recentResponse.json();
      song = recentData.items?.[0]?.track;
      if (!song) return null;
      title = song.name;
      artist = song.artists.map((a: { name: string }) => a.name).join(", ");
      album = song.album.name;
      albumImageUrl = song.album.images[0].url;
      songUrl = song.external_urls.spotify;
    } else {
      song = await response.json();
      if (!song?.item) return null;
      isPlaying = song.is_playing;
      title = song.item.name;
      artist = song.item.artists
        .map((_artist: { name: string }) => _artist.name)
        .join(", ");
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
  } catch {
    return null;
  }
}
