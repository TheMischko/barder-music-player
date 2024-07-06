import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Song } from "../models/music";
import { BehaviorSubject, firstValueFrom, Observable, Subscription } from "rxjs";
import { PlaylistService } from "@services/playlist.service";
import { SongService } from "@services/song.service";
import { PlaybackSettingsService } from "@services/playback-settings.service";
import { LoopState } from "../player/player.component.model";

export interface SetPlaylistArgs {
  startWithSongId?: number;
  includeChildren?: boolean;
  shuffle?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class QueueService implements OnInit, OnDestroy {
  private playlist: Song[] | null = null;
  private currentSongIndex: number = -1;
  private playedSongs: Song[] = [];

  private currentSong = new BehaviorSubject<Song | null>(null);
  private nextSong = new BehaviorSubject<Song | null>(null);
  private _currentPlaylistId: number;

  private loopChangeSubscription: Subscription;
  private loop: LoopState = LoopState.None;

  constructor(
    private playlistService: PlaylistService,
    private songService: SongService,
    private playbackSettingsService: PlaybackSettingsService,
  ) {}

  ngOnInit() {
    this.loopChangeSubscription = this.playbackSettingsService.loop$.subscribe((loop) => {
      this.loop = loop;
    });
  }

  ngOnDestroy() {
    this.loopChangeSubscription.unsubscribe();
  }

  public get currentPlaylistId(): number {
    return this._currentPlaylistId;
  }

  public setPlaylist(playlistId: number, args?: SetPlaylistArgs): Observable<Song[]> {
    return new Observable((observer) => {
      this.getSongsOfPlaylist(playlistId).then(async (songs: Song[]) => {
        this._currentPlaylistId = playlistId;
        if (args?.includeChildren) {
          const playlists = await firstValueFrom(
            this.playlistService.getChildrenPlaylists$(playlistId),
          );
          for (let child of playlists) {
            const childSongs = await firstValueFrom(
              this.songService.getSongsForPlaylist(child.id),
            );
            childSongs.forEach((song) => songs.push(song));
          }
          songs = songs.reduce((acc, current) => {
            if (!acc.some((item) => item.id === current.id)) {
              acc.push(current);
            }
            return acc;
          }, []);
        }

        if (args?.shuffle) {
          songs = this.shuffleArray(songs);
        }

        if (args?.startWithSongId) {
          this.currentSongIndex = songs.findIndex(
            (song) => song.id === args.startWithSongId,
          );
        } else {
          this.currentSongIndex = 0;
        }

        this.playlist = songs;
        this.updateCurrentAndNextSongs();

        observer.next(this.playlist);
        observer.complete();
      });
    });
  }

  public getCurrentSong$(): Observable<Song> {
    return this.currentSong.asObservable();
  }

  public getCurrentSongIndex(): number {
    return this.currentSongIndex;
  }

  public getNextSong$(): Observable<Song> {
    return this.nextSong.asObservable();
  }

  // Advances the queue to the next song.
  public playNextSong(): void {
    if (this.currentSongIndex < this.playlist.length - 1) {
      this.currentSongIndex++;
    } else if (this.shouldLoop) {
      this.currentSongIndex = 0;
    } else {
      return;
    }
    this.updateCurrentAndNextSongs();
  }

  // Goes back to the previous song in the queue.
  public playPreviousSong(): void {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
    } else if (this.shouldLoop) {
      this.currentSongIndex = this.playlist.length - 1;
    } else {
      return;
    }
    this.updateCurrentAndNextSongs();
  }

  public isCurrentLastSong(): boolean {
    return this.currentSongIndex >= this.playlist.length - 1;
  }

  public get shouldLoop(): boolean {
    return this.loop === LoopState.Playlist;
  }

  private updateCurrentAndNextSongs(): void {
    this.currentSong.next(this.playlist[this.currentSongIndex]);
    if (this.isCurrentLastSong() && !this.shouldLoop) {
      this.nextSong.next(null);
      return;
    }
    const nextIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.nextSong.next(this.playlist[nextIndex]);
  }

  private async getSongsOfPlaylist(playlistId: number): Promise<Song[]> {
    return await firstValueFrom(this.songService.getSongsForPlaylist(playlistId));
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
