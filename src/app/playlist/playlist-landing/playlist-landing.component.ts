import {Component, ViewContainerRef} from '@angular/core';
import {ModalService} from "@services/modal.service";
import {CreatePlaylistModalComponent} from "./create-playlist-modal/create-playlist-modal.component";

@Component({
  selector: 'app-playlist-landing',
  templateUrl: './playlist-landing.component.html',
  styleUrl: './playlist-landing.component.scss'
})
export class PlaylistLandingComponent {
  constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef) {
  }

  openNewPlaylistModal() {
    this.modalService.open(CreatePlaylistModalComponent, this.viewContainerRef);
  }

}
