export interface Song {
  id?: number;
  name: string;
  duration: number;
  filePath: string;
  playlistID?: number;
  orderInPlaylist?: number;
}

export interface NewSongData {
  name: string;
  duration: number;
  filePath: string;
  playlistID?: number;
  orderInPlaylist?: number;
}

export interface SongProgress {
  position: number;
  duration: number;
}
