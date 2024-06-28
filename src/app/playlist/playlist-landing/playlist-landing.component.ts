import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalService } from "@services/modal.service";
import { CreatePlaylistModalComponent } from "./create-playlist-modal/create-playlist-modal.component";
import { ModalComponent } from "@shared/containers/modal/modal.component";
import { CreatePlaylistData, Playlist } from "../../models/playlist";
import { PlaylistService } from "@services/playlist.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/internal/operators/map";

@Component({
  selector: "app-playlist-landing",
  templateUrl: "./playlist-landing.component.html",
  styleUrl: "./playlist-landing.component.scss",
})
export class PlaylistLandingComponent implements OnInit, OnDestroy {
  playlists: Playlist[] = [];
  private subscriptions: Subscription[] = [];
  constructor(
    private modalService: ModalService,
    private playlistService: PlaylistService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.playlistService.playlists$
        .pipe(
          map((playlists) =>
            playlists.filter((playlist) => playlist.parentID === null),
          ),
        )
        .subscribe((playlists) => {
          this.playlists = playlists;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  openNewPlaylistModal() {
    const modal: ModalComponent<CreatePlaylistData> = this.modalService.open(
      CreatePlaylistModalComponent,
    );
    modal.closed.subscribe((data) => {
      this.createNewPlaylist(data);
    });
  }

  private createNewPlaylist(data: CreatePlaylistData | null) {
    if (data === null) {
      return;
    }
    this.playlistService.addPlaylist(data);
  }
}
