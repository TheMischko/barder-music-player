import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Playlist } from "../../../models/playlist";
import { Subscription } from "rxjs";
import { SongService } from "@services/song.service";
import { Song } from "../../../models/music";

@Component({
  selector: "app-song-displayer",
  templateUrl: "./song-displayer.component.html",
  styleUrl: "./song-displayer.component.scss",
})
export class SongDisplayerComponent implements OnInit, OnDestroy {
  @Input() playlist: Playlist;
  songs: Song[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.songService
        .getSongsForPlaylist(this.playlist.id)
        .subscribe((songs) => {
          this.songs = songs.sort(
            (a, b) => a.orderInPlaylist - b.orderInPlaylist,
          );
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
