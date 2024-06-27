import {Song} from "./music";

export interface CreatePlaylistData {
  coverImage: string;
  name: string;
  parentID: string | null;
}

export interface Playlist {
  coverImage: string;
  id: string;
  name: string;
  parentID: string | null;
  songs: Song[];
}