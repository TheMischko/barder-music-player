import { EventEmitter, Injectable, OnDestroy } from "@angular/core";
import { Howl } from "howler";
import { PlaybackSettingsService } from "@services/playback-settings.service";
import {
  BehaviorSubject,
  firstValueFrom,
  interval,
  Observable,
  Subscription,
} from "rxjs";
import { LoopState } from "../../player/player.component.model";
import { Song } from "../../models/music";
import { ProgressService } from "../../player/progress.service";
import { FileService } from "@services/file.service";
import { QueueService } from "@services/queue.service";
import { PreloadingState } from "@services/player-service/preloading-state";
import { PreloadingStateManager } from "@services/player-service/preloading-state.manager";

@Injectable({
  providedIn: "root",
})
export class PlayerService implements OnDestroy {
  public onLoad = new EventEmitter();
  public onStartPlaying = new EventEmitter<Song>();
  public onPause = new EventEmitter();
  public onEndPlaying = new EventEmitter();

  private playingSong: Howl;
  private songIdHowlMapping: { [key: string]: Howl | null } = {};
  private readonly PROGRESS_INTERVAL_CHECK = 250;
  private readonly PRELOAD_TIME_PORTION = 0.9;
  private readonly PRELOAD_MIN_SECONDS = 30;
  private readonly PRELOAD_SONGS_COUNT = 3;
  private playingSongID: number;
  private isPlaying: boolean = false;
  private currentPlayingSongId: number | null = null;
  private playbackState = new BehaviorSubject<boolean>(false);
  private songLoadingState = new BehaviorSubject<boolean>(false);

  private settingsSubscriptions: Subscription[] = [];
  private progressSubscription: Subscription;
  private readonly songSubscription: Subscription;
  private preloadStateManager: PreloadingStateManager;

  private songEventsAttached: boolean = false;

  constructor(
    private playbackSettings: PlaybackSettingsService,
    private progressService: ProgressService,
    private fileService: FileService,
    private queueService: QueueService,
  ) {
    this.settingsSubscriptions.push(
      this.playbackSettings.volume$.subscribe((volume) => {
        if (this.playingSong) {
          this.playingSong.volume(volume);
        }
      }),
    );
    this.settingsSubscriptions.push(
      this.playbackSettings.loop$.subscribe((loop: LoopState) => {
        if (this.playingSong) {
          this.playingSong.loop(loop === LoopState.Current);
        }
      }),
    );
    this.settingsSubscriptions.push(
      this.playbackSettings.mute$.subscribe((muted: boolean) => {
        if (this.playingSong) {
          this.playingSong.mute(muted);
        }
      }),
    );
    this.songSubscription = this.queueService.getCurrentSong$().subscribe((song) => {
      if (this.playingSong) {
        this.playingSong?.stop();
      }

      if (song) {
        this.songEventsAttached = false;
        this.playSong(song).then((_) => {});
      }
    });

    this.preloadStateManager = new PreloadingStateManager();
    this.preloadStateManager.unload.subscribe((oldSongId) => {
      this.songIdHowlMapping[oldSongId]?.unload();
      this.songIdHowlMapping[oldSongId] = undefined;
    });
  }

  ngOnDestroy() {
    this.settingsSubscriptions.forEach((sub) => sub.unsubscribe());
    if (this.songSubscription) {
      this.songSubscription.unsubscribe();
    }
  }

  public get playbackState$(): Observable<boolean> {
    return this.playbackState.asObservable();
  }

  public get songLoadingState$(): Observable<boolean> {
    return this.songLoadingState.asObservable();
  }

  /**
   * Adds playlist to the queue and preloads first song.
   * @param playlistId
   * @param startSongId
   */
  public setPlaylist(playlistId: number, startSongId: number): Observable<never> {
    return new Observable<never>((observer) => {
      let setupSub = this.queueService
        .setPlaylist(playlistId, {
          startWithSongId: startSongId,
          includeChildren: false,
          shuffle: false,
        })
        .subscribe((songs: Song[]) => {
          this.prepareSongHowlMapping(songs);
          const currentSongSub = this.queueService
            .getCurrentSong$()
            .subscribe((currentSong) => {
              const preloadSub = this.preloadSong(currentSong).subscribe(() => {
                observer.next();
                observer.complete();
                preloadSub.unsubscribe();
                currentSongSub.unsubscribe();
                setupSub.unsubscribe();
              });
            });
        });
    });
  }

  /**
   * Starts or resume playing current song.
   */
  public play(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playbackState.next(this.isPlaying);
    }
    if (this.currentSongNotExistsOrOver) {
      const currentSongSub = this.queueService
        .getCurrentSong$()
        .subscribe((currentSong) => {
          this.playSong(currentSong).then((_) => {
            currentSongSub.unsubscribe();
          });
        });
    } else {
      this.playingSongID = this.playingSong.play();
    }
  }

  /**
   * Pauses current song.
   */
  public pause(): void {
    if (this.playingSong) {
      this.isPlaying = false;
      this.playbackState.next(this.isPlaying);
      this.playingSong.pause();
    }
  }

  public seek(newPosition: number) {
    if (!this.playingSongID) {
      return;
    }
    if (this.playingSong.duration() <= newPosition) {
      this.playingSong.seek(this.playingSong.duration() - 100, this.playingSongID);
      return;
    }
    if (newPosition < 0) {
      this.playingSong.seek(0, this.playingSongID);
      return;
    }
    this.playingSong.seek(newPosition, this.playingSongID);
  }

  public preloadNextSong() {
    this.queueService.getNextSong$().subscribe({
      next: (nextSong) => {
        if (this.songIdHowlMapping[nextSong.id]) {
          return;
        }
        this.preloadSong(nextSong);
      },
    });
  }

  public preloadPrevSong() {
    this.queueService.getPrevSong$().subscribe({
      next: (prevSong) => {
        if (prevSong === undefined) {
          return;
        }
        if (this.songIdHowlMapping[prevSong.id]) {
          return;
        }
        this.preloadSong(prevSong);
      },
    });
  }

  public forcePlayNextSong() {
    this.playingSong.stop();
    this.cleanAfterSongEnd();
    this.onEndPlaying.emit();
    this.preloadSongsAhead(this.PRELOAD_SONGS_COUNT);
    this.queueService.playNextSong();
  }

  public forcePlayPrevSong() {
    this.playingSong.stop();
    this.cleanAfterSongEnd();
    this.onEndPlaying.emit();
    this.queueService.playPreviousSong();
  }

  private get currentSongNotExistsOrOver() {
    return (
      this.playingSong === undefined ||
      this.playingSong.seek() >= this.playingSong.duration()
    );
  }

  private async playSong(song: Song) {
    if (this.currentPlayingSongId === song?.id && this.isPlaying) {
      return;
    }
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playbackState.next(this.isPlaying);
      this.preloadStateManager.changeState(song.id, PreloadingState.Completed);
    }

    this.currentPlayingSongId = song.id;

    this.songLoadingState.next(true);
    if (this.songIdHowlMapping[song.id] === null || !this.songIdHowlMapping[song.id]) {
      await firstValueFrom(this.preloadSong(song));
    }

    this.playingSong = this.songIdHowlMapping[song.id];

    const loop: boolean = this.playbackSettings.loop$.value === LoopState.Current;
    const volume: number = this.playbackSettings.volume$.getValue();
    const mute: boolean = this.playbackSettings.mute$.getValue();

    this.playingSong.loop(loop);
    this.playingSong.volume(volume);
    this.playingSong.mute(mute);

    if (!this.songEventsAttached) {
      this.attachSongEvents(song);
      this.songEventsAttached = true;
    }

    this.songLoadingState.next(this.playingSong.state() !== "loaded");
    this.playingSongID = this.playingSong.play();
  }

  private attachSongEvents(song: Song) {
    this.playingSong.on("load", () => {
      this.songLoadingState.next(this.playingSong.state() !== "loaded");
      this.onLoad.emit();
    });
    this.playingSong.on("play", () => {
      this.onStartPlaying.emit(song);
      this.progressService.updateCurrentDurationMillis(song.duration);
      this.startProgressTracking();
    });
    this.playingSong.on("pause", () => {
      this.onPause.emit();
    });
    this.playingSong.on("end", () => {
      this.cleanAfterSongEnd();
      this.onEndPlaying.emit();
      this.queueService.playNextSong();
    });
  }

  private startProgressTracking() {
    let preloaded = false;
    this.progressSubscription = interval(this.PROGRESS_INTERVAL_CHECK).subscribe(() => {
      if (this.playingSong === undefined) {
        this.progressService.updatePlayedLengthMillis(0);
        return;
      }
      const position = (this.playingSong.seek() as number) * 1000;
      const duration = this.playingSong.duration() * 1000;
      const remaining = duration - position;

      this.progressService.updatePlayedLengthMillis(position);

      const isPositionInPreloadStage =
        position / duration >= this.PRELOAD_TIME_PORTION ||
        remaining < this.PRELOAD_MIN_SECONDS;

      if (!preloaded && isPositionInPreloadStage) {
        this.preloadSongsAhead(this.PRELOAD_SONGS_COUNT);
        preloaded = true;
      }
    });
  }

  private stopProgressTracking() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  private prepareSongHowlMapping(songs: Song[]): void {
    this.songIdHowlMapping = {};
    songs.forEach((song) => {
      this.songIdHowlMapping[song.id] = null;
    });
  }

  private preloadSong(song: Song): Observable<never> {
    return new Observable((observer) => {
      if (this.songIdHowlMapping[song.id]) {
        observer.next();
        return observer.complete();
      }
      this.preloadStateManager.changeState(song.id, PreloadingState.InProgress);

      const songHowlSub = this.createHowl(song).subscribe((howl) => {
        this.songIdHowlMapping[song.id] = howl;
        this.preloadStateManager.changeState(song.id, PreloadingState.Completed);
        observer.next();
        observer.complete();
        songHowlSub.unsubscribe();
      });
    });
  }

  private preloadSongsAhead(numberOfSongs: number): void {
    this.queueService.getNextSongs(numberOfSongs).forEach((song) => {
      if (this.preloadStateManager.getState(song.id) !== PreloadingState.Completed) {
        this.preloadSong(song).subscribe();
      }
    });
  }

  private cleanAfterSongEnd() {
    this.stopProgressTracking();
    this.isPlaying = false;
    this.currentPlayingSongId = null;
    this.songEventsAttached = false;
  }

  createHowl(song: Song): Observable<Howl> {
    return new Observable((observer) => {
      if (!song.filePath.includes("assets")) {
        let sourceSub = this.fileService
          .readMP3ToBase64(song.filePath)
          .subscribe((convertedSrc) => {
            const howl = new Howl({
              src: [convertedSrc],
            });
            observer.next(howl);
            observer.complete();
            sourceSub.unsubscribe();
          });
        return;
      }
      const howl = new Howl({
        src: [song.filePath],
      });
      observer.next(howl);
      observer.complete();
    });
  }
}
