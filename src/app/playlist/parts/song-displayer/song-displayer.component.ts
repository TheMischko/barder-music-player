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

@Component({
  selector: "app-song-displayer",
  templateUrl: "./song-displayer.component.html",
  styleUrl: "./song-displayer.component.scss",
})
export class SongDisplayerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() playlist: Playlist;
  songs: Song[] = [];

  private songsSubscription: Subscription;

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
  }

  openNewSongModal() {}

  trackBySongId(_: number, song: Song): number {
    return song.id;
  }

  private fetchSongs() {
    this.songsSubscription = this.songService
      .getSongsForPlaylist(this.playlist.id)
      .subscribe((songs) => {
        const testSong: Song = {
          id: 123,
          name: "Test Song",
          filePath: "assets/playlist/Cobblestone_Village.mp3",
          playlistID: this.playlist.id,
          duration: 258000,
          orderInPlaylist: 1,
        };
        this.songs = [testSong, ...songs].sort(
          (a, b) => a.orderInPlaylist - b.orderInPlaylist,
        );
      });
  }
}
