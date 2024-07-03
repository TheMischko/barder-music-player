import { Injectable, OnDestroy } from "@angular/core";
import { TauriService } from "@services/tauri.service";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { NewSongData, Song } from "../models/music";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class SongService implements OnDestroy {
  private songs: BehaviorSubject<Song[]> | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private tauriService: TauriService) {}

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get songs$(): Observable<Song[]> {
    if (this.songs === null) {
      this.songs = new BehaviorSubject<Song[]>([]);
      this.loadSongs();
    }
    return this.songs.asObservable();
  }

  public getSongsForPlaylist(playlistID: number): Observable<Song[]> {
    return this.songs$.pipe(
      map((songs) => {
        return songs.filter((song) => song.playlistID === playlistID);
      }),
    );
  }

  public saveNewSong(songData: NewSongData): Observable<Song> {
    if (!this.songs) {
      this.songs$;
    }
    const newSongObservable = new Subject<Song>();
    this.subscriptions.push(
      this.tauriService
        .invokeCommand<Song>("create_song", {
          new_song: songData,
        })
        .subscribe((song) => {
          this.songs.next([...this.songs.value, song]);
          newSongObservable.next(song);
          newSongObservable.complete();
        }),
    );
    return newSongObservable.asObservable();
  }

  private loadSongs() {
    this.subscriptions.push(
      this.tauriService
        .invokeCommand<Song[]>("get_songs", {
          playlist_id: null,
        })
        .subscribe((songs) => {
          if (songs === null) {
            this.songs.next([]);
            return;
          }
          this.songs.next(songs);
        }),
    );
  }
}
