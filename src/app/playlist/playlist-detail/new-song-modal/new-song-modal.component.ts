import { Component, Input } from "@angular/core";
import { Song } from "../../../models/music";
import { ModalComponent } from "@shared/containers/modal/modal.component";

@Component({
  selector: "app-new-song-modal",
  templateUrl: "./new-song-modal.component.html",
  styleUrl: "./new-song-modal.component.scss",
})
export class NewSongModalComponent extends ModalComponent<Song> {
  @Input() playlistId: number;
  isVisible: boolean = true;

  onSubmit(song: Song) {
    this.close(song);
    this.isVisible = false;
  }
}
