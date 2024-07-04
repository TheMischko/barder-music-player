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

@Component({
  selector: "app-song-displayer",
  templateUrl: "./song-displayer.component.html",
  styleUrl: "./song-displayer.component.scss",
})
export class SongDisplayerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() playlist: Playlist;
  songs: Song[] = [];

  private songsSubscription: Subscription;
  private newModalCloseSubscription: Subscription;
  private saveNewSongSubscription: Subscription;

  constructor(
    private songService: SongService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.fetchSongs();
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
