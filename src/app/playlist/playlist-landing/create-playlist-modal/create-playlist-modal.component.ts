import { Component, Input } from "@angular/core";
import { ModalComponent } from "@shared/containers/modal/modal.component";
import { FormControl, Validators } from "@angular/forms";
import { CreatePlaylistData } from "../../../models/playlist";

@Component({
  selector: "app-create-playlist-modal",
  templateUrl: "./create-playlist-modal.component.html",
  styleUrl: "./create-playlist-modal.component.scss",
})
export class CreatePlaylistModalComponent extends ModalComponent<CreatePlaylistData | null> {
  @Input() playlistParentId: number | null = null;
  playlistName = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(32),
  ]);
  coverImage: string = "";
  isVisible: boolean = true;

  closeData: CreatePlaylistData | null = null;

  createClick() {
    this.closeData = {
      parentID: this.playlistParentId,
      name: this.playlistName.value,
      coverImage: this.coverImage,
    };
    this.isVisible = false;
    this.close(this.closeData);
  }

  canceled() {
    this.close(null);
  }

  onImageSelected(image: string): void {
    this.coverImage = image;
  }
}
