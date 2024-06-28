import { Song } from "./music";

export interface CreatePlaylistData {
  coverImage: string;
  name: string;
  parentID: number | null;
}

export interface Playlist {
  coverImage: string;
  id: number;
  name: string;
  parentID: number | null;
  songs: Song[];
  created_at?: Date;
}
