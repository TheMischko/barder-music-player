import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Playlist } from "../../../models/playlist";
import { Subscription } from "rxjs";
import { SongService } from "@services/song.service";
import { Song } from "../../../models/music";
import { ModalService } from "@services/modal.service";
import { NewSongModalComponent } from "../../playlist-detail/new-song-modal/new-song-modal.component";
import { ModalComponent } from "@shared/containers/modal/modal.component";
import { PlayerService } from "@services/player.service";
import { QueueService } from "@services/queue.service";

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

  private songsSubscription: Subscription;
  private newModalCloseSubscription: Subscription;
  private saveNewSongSubscription: Subscription;
  private playerSubscription: Subscription;
  private playbackStateSubscription: Subscription;

  constructor(
    private songService: SongService,
    private modalService: ModalService,
    private playerService: PlayerService,
    private queueService: QueueService,
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
  }

  openNewSongModal() {
    const modal: ModalComponent<Song> = this.modalService.open(NewSongModalComponent, {
      playlistId: this.playlist.id,
    });
    this.newModalCloseSubscription = modal.closed.subscribe((song) => {
      this.newModalCloseSubscription.unsubscribe();
      this.saveNewSongSubscription = this.songService
        .saveNewSong({
          name: song.name,
          playlistID: this.playlist.id,
          filePath: song.filePath,
          duration: song.duration,
          orderInPlaylist: this.songs.length + 1,
        })
        .subscribe((_) => {
          this.saveNewSongSubscription.unsubscribe();
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

    const currentPlaylistId = this.queueService.currentPlaylistId;
    if (currentPlaylistId === this.playlist.id) {
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
}
