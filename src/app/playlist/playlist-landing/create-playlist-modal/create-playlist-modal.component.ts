import {Component, Input} from '@angular/core';
import {ModalComponent} from "@shared/containers/modal/modal.component";
import {FormControl, Validators} from "@angular/forms";
import {CreatePlaylistData} from "../../../models/playlist";

@Component({
  selector: 'app-create-playlist-modal',
  templateUrl: './create-playlist-modal.component.html',
  styleUrl: './create-playlist-modal.component.scss'
})
export class CreatePlaylistModalComponent extends ModalComponent {
  @Input() playlistParentId: string | null = null;
  playlistName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(32)
  ]);
  coverImage = '';

  createClick(){
    const data: CreatePlaylistData = {
      parentID: this.playlistParentId,
      name: this.playlistName.value,
      coverImage: this.coverImage
    };
  }

  onImageSelected(image: string): void {
    this.coverImage = image;
  }
}
