import { Component, Input } from "@angular/core";
import { Playlist } from "../../../models/playlist";
import { Router } from "@angular/router";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrl: "./playlist-card.component.scss",
})
export class PlaylistCardComponent {
  @Input() playlist: Playlist;

  constructor(private router: Router) {}
  displayDetail(): void {
    this.router.navigate(["/playlist", this.playlist.id]);
  }
}
