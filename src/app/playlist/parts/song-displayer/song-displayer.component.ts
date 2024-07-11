import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Playlist } from "../../../models/playlist";
import {
  BehaviorSubject,
  catchError,
  finalize,
  firstValueFrom,
  from,
  mergeMap,
  Observable,
  of,
  scan,
  Subscription,
  switchMap,
} from "rxjs";
import { SongService } from "@services/song.service";
import { NewSongData, Song } from "../../../models/music";
import { ModalService } from "@services/modal.service";
import { NewSongModalComponent } from "../../playlist-detail/new-song-modal/new-song-modal.component";
import { ModalComponent } from "@shared/containers/modal/modal.component";
import { PlayerService } from "@services/player.service";
import { QueueService } from "@services/queue.service";
import { listen, UnlistenFn, Event } from "@tauri-apps/api/event";
import { path as Path } from "@tauri-apps/api";
import { FileService } from "@services/file.service";

@Component({
  selector: "app-song-displayer",
  templateUrl: "./song-displayer.component.html",
  styleUrl: "./song-displayer.component.scss",
})
export class SongDisplayerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() playlist: Playlist;
  songs: Song[] = [];

  isSongAnyPlaying: boolean = false;
  editMode: boolean = false;
  playingSongId: number | undefined;
  areFilesDraggedOver = new BehaviorSubject<boolean>(false);
  filesUploadingProgress = new BehaviorSubject<number>(1);

  private songsSubscription: Subscription;
  private newModalCloseSubscription: Subscription;
  private saveNewSongSubscription: Subscription;
  private playerSubscription: Subscription;
  private playbackStateSubscription: Subscription;
  private unlistenFunctions: UnlistenFn[] = [];

  constructor(
    private songService: SongService,
    private modalService: ModalService,
    private playerService: PlayerService,
    private queueService: QueueService,
    private fileService: FileService,
  ) {}

  ngOnInit(): void {
    this.fetchSongs();
    this.playerSubscription = this.queueService
      .getCurrentSong$()
      .subscribe((playingSong) => {
        if (!playingSong) {
          return;
        }
        this.playingSongId = playingSong.id;
      });
    this.playbackStateSubscription = this.playerService.playbackState$.subscribe(
      (isPlaying) => {
        this.isSongAnyPlaying = isPlaying;
      },
    );

    listen("tauri://file-drop", (e: Event<string[]>) => this.handleFilesDrop(e)).then(
      (unlisten) => {
        this.unlistenFunctions.push(unlisten);
      },
    );

    listen("tauri://file-drop-hover", (e: Event<string[]>) =>
      this.handleDragStart(e),
    ).then((unlisten) => {
      this.unlistenFunctions.push(unlisten);
    });

    listen("tauri://file-drop-cancelled", (e: Event<string[]>) =>
      this.handleDragEnd(e),
    ).then((unlisten) => {
      this.unlistenFunctions.push(unlisten);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.playlist) {
      this.fetchSongs();
    }
  }

  ngOnDestroy(): void {
    if (this.songsSubscription) {
      this.songsSubscription.unsubscribe();
    }
    if (this.newModalCloseSubscription) {
      this.newModalCloseSubscription.unsubscribe();
    }
    if (this.saveNewSongSubscription) {
      this.saveNewSongSubscription.unsubscribe();
    }
    if (this.playerSubscription) {
      this.playerSubscription.unsubscribe();
    }
    if (this.playbackStateSubscription) {
      this.playbackStateSubscription.unsubscribe();
    }
    this.unlistenFunctions.forEach((unls) => unls());
  }

  openNewSongModal() {
    const modal: ModalComponent<Song> = this.modalService.open(NewSongModalComponent, {
      playlistId: this.playlist.id,
    });
    this.newModalCloseSubscription = modal.closed.subscribe((song) => {
      this.saveNewSongSubscription = this.uploadSong(song).subscribe((_) => {
        this.saveNewSongSubscription.unsubscribe();
        this.newModalCloseSubscription.unsubscribe();
      });
    });
  }

  trackBySongId(_: number, song: Song): number {
    return song.id;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongActive(song) && this.isSongAnyPlaying;
  }

  isSongActive(song: Song): boolean {
    return this.playingSongId === song.id;
  }

  async playPauseSong(song: Song) {
    if (this.isSongPlaying(song)) {
      this.playerService.pause();
      return;
    }

    const playingSong = await firstValueFrom(this.queueService.getCurrentSong$());
    if (song.id === playingSong?.id) {
      this.playerService.play();
      return;
    }

    const setPlaylistSub = this.playerService
      .setPlaylist(this.playlist.id, song.id)
      .subscribe(() => {
        setPlaylistSub.unsubscribe();
        this.playerService.play();
      });
  }

  async handleDragStart(event: Event<string[]>) {
    const validFiles = await this.filterFileNames(event.payload);
    if (validFiles.length === 0) {
      return;
    }
    this.areFilesDraggedOver.next(true);
  }

  async handleFilesDrop(event: Event<string[]>) {
    const files = await this.filterFileNames(event.payload);
    this.filesUploadingProgress.next(0);

    const subs = from(files)
      .pipe(
        mergeMap(
          (file) =>
            this.loadSongAndUpload(file).pipe(
              switchMap((song) =>
                this.songService.saveNewSong({
                  ...song,
                  duration: SongService.convertSecondsToMillis(song.duration),
                }),
              ),
              catchError((error) => {
                console.error(`Error uploading file ${file}:`, error);
                return of(null);
              }),
            ),
          3,
        ),
        scan(
          (acc: { progress: number; completed: any }, curr: Song, index: number) => {
            const progress = (index + 1) / files.length;
            this.filesUploadingProgress.next(progress);
            return { progress, completed: acc.completed + (curr ? 1 : 0) };
          },
          { progress: 0, completed: 0 },
        ),
        finalize(() => {
          this.handleDragEnd(event);
          this.filesUploadingProgress.next(1);
        }),
      )
      .subscribe({
        error: (err) => console.error(err),
        complete: () => subs.unsubscribe(),
      });
  }

  handleDragEnd(_: Event<string[]>) {
    this.areFilesDraggedOver.next(false);
    this.filesUploadingProgress.next(1);
  }

  private uploadSong(song: Song): Observable<Song> {
    return this.songService.saveNewSong({
      name: song.name,
      playlistID: this.playlist.id,
      filePath: song.filePath,
      duration: song.duration,
      orderInPlaylist: this.songs.length + 1,
    });
  }

  private loadSongAndUpload(songPath: string): Observable<NewSongData> {
    return new Observable((observer) => {
      firstValueFrom(this.fileService.readMP3Data(songPath)).then((metadata) => {
        setTimeout(() => {
          const song: NewSongData = {
            duration: metadata.duration,
            filePath: songPath,
            name: metadata.title,
            playlistID: this.playlist.id,
          };
          observer.next(song);
          observer.complete();
        }, 2000);
      });
    });
  }

  private fetchSongs() {
    if (!this.playlist?.id) {
      return;
    }
    this.songsSubscription = this.songService
      .getSongsForPlaylist(this.playlist.id)
      .subscribe((songs) => {
        this.songs = songs.sort((a, b) => a.orderInPlaylist - b.orderInPlaylist);
      });
  }

  private async filterFileNames(filenames: string[]): Promise<string[]> {
    const fileChecks = filenames.map(async (file) => {
      const ext = await Path.extname(file);
      const isValid = Howler.codecs(ext);
      return { file, isValid };
    });

    const checkedFiles = await Promise.all(fileChecks);
    return checkedFiles.filter((check) => check.isValid).map((check) => check.file);
  }
}
