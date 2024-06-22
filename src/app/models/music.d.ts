export interface Song {
  id?: string;
  title: string;
  playlist?: string;
  duration: number;
  src: string;
}

export interface SongProgress {
  position: number;
  duration: number;
}