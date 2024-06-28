import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { CreatePlaylistData, Playlist } from "../models/playlist";
import { Song } from "../models/music";
import { map } from "rxjs/internal/operators/map";
import { TauriService } from "@services/tauri.service";

@Injectable({
  providedIn: "root",
})
export class PlaylistService implements OnDestroy {
  private playlists: BehaviorSubject<Playlist[]> | null = null;
  private destroy$ = new Subject<void>();
  private subscriptions: Subscription[] = [];
  constructor(private tauriService: TauriService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get playlists$() {
    if (this.playlists === null) {
      this.playlists = new BehaviorSubject<Playlist[]>([]);
      this.loadPlaylists();
    }
    return this.playlists.asObservable();
  }

  public getPlaylist$(playlistID: number) {
    return this.playlists$.pipe(
      map((playlists) =>
        playlists.find((playlist) => {
          return playlist.id === playlistID;
        }),
      ),
    );
  }

  public getChildrenPlaylists$(playlistID: number) {
    return this.playlists$.pipe(
      map((playlists) =>
        playlists.filter((playlist) => playlist.parentID === playlistID),
      ),
    );
  }

  loadPlaylists(): void {
    // Load the playlists from the provider
    this.subscriptions.push(
      this.tauriService
        .invokeCommand<Playlist[]>("get_all_playlists")
        .pipe(takeUntil(this.destroy$))
        .subscribe((playlists) => {
          if (playlists === null) {
            this.playlists.next([]);
            return;
          }
          this.playlists.next(playlists);
        }),
    );
  }

  addPlaylist(playlist: CreatePlaylistData): void {
    if (this.playlists === null) {
      this.playlists$;
    }
    this.subscriptions.push(
      this.tauriService
        .invokeCommand("create_playlist", { newPlaylist: playlist })
        .subscribe((playlist) => {
          this.playlists.next([...this.playlists.value, playlist as Playlist]);
        }),
    );
  }

  addSongToPlaylist(playlistID: number, song: Song) {
    const playlistIndex = this.playlists.value.findIndex(
      (playlist) => playlist.id === playlistID,
    );
    if (playlistIndex === -1) {
      throw new Error("Playlist not found");
    }
    const playlists = this.playlists.value;
    playlists[playlistIndex].songs.push(song);
    this.playlists.next(playlists);
  }

  updatePlaylist(playlistID: number, updatedPlaylist: Playlist) {
    const playlistIndex = this.playlists.value.findIndex(
      (playlist) => playlist.id === playlistID,
    );
    if (playlistIndex === -1) {
      throw new Error("Playlist not found");
    }
    const playlists = this.playlists.value;
    this.playlists.next([
      ...playlists.slice(0, playlistIndex),
      updatedPlaylist,
      ...playlists.slice(playlistIndex + 1),
    ]);
  }

  removePlaylist(playlistID: number) {
    const playlistIndex = this.playlists.value.findIndex(
      (playlist) => playlist.id === playlistID,
    );
    if (playlistIndex === -1) {
      throw new Error("Playlist not found");
    }
    const playlists = this.playlists.value;
    this.playlists.next([
      ...playlists.slice(0, playlistIndex),
      ...playlists.slice(playlistIndex + 1),
    ]);
  }
}
