export interface Song {
  id?: string;
  title: string;
  duration: number;
  src: string;
}

export interface SongProgress {
  position: number;
  duration: number;
}