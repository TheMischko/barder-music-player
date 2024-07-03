import { Injectable } from "@angular/core";
import { TauriService } from "@services/tauri.service";
import { Observable } from "rxjs";
import { NewSongData, Song } from "../models/music";

@Injectable({
  providedIn: "root",
})
export class SongService {
  constructor(private tauriService: TauriService) {}

  public getSongsForPlaylist(playlistID: number): Observable<Song[]> {
    return this.tauriService.invokeCommand<Song[]>("get_songs", {
      playlist_id: playlistID,
    });
  }

  public saveNewSong(songData: NewSongData): Observable<Song> {
    return this.tauriService.invokeCommand<Song>("create_song", {
      new_song: songData,
    });
  }
}
