import { Component, Input } from "@angular/core";
import { Song } from "../../../models/music";

@Component({
  selector: "app-new-song-modal",
  templateUrl: "./new-song-modal.component.html",
  styleUrl: "./new-song-modal.component.scss",
})
export class NewSongModalComponent {
  @Input() playlistId: number;

  onSubmit(song: Song) {}
}
