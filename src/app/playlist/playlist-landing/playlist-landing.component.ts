import { Component } from "@angular/core";
import { ModalService } from "@services/modal.service";
import { CreatePlaylistModalComponent } from "./create-playlist-modal/create-playlist-modal.component";
import { ModalComponent } from "@shared/containers/modal/modal.component";
import { CreatePlaylistData } from "../../models/playlist";

@Component({
  selector: "app-playlist-landing",
  templateUrl: "./playlist-landing.component.html",
  styleUrl: "./playlist-landing.component.scss",
})
export class PlaylistLandingComponent {
  constructor(private modalService: ModalService) {}

  openNewPlaylistModal() {
    console.log("openNewPlaylistModal method called");
    const modal: ModalComponent<CreatePlaylistData> = this.modalService.open(
      CreatePlaylistModalComponent,
    );
    modal.closed.subscribe((data) => {
      console.log(data);
    });
  }
}
