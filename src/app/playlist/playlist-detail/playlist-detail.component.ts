import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlaylistService } from "@services/playlist.service";
import { CreatePlaylistData, Playlist } from "../../models/playlist";
import { Observable, Subscription, switchMap } from "rxjs";
import { ModalService } from "@services/modal.service";
import { CreatePlaylistModalComponent } from "../playlist-landing/create-playlist-modal/create-playlist-modal.component";
import { ModalComponent } from "@shared/containers/modal/modal.component";

@Component({
  selector: "app-playlist-detail",
  templateUrl: "./playlist-detail.component.html",
  styleUrl: "./playlist-detail.component.scss",
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  id: number;
  playlist: Playlist;
  childPlaylists: Playlist[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.linkToParamMapIdSubscription<Playlist>(
        this.playlistService.getPlaylist$.bind(this.playlistService),
      ).subscribe((playlist) => {
        this.playlist = playlist;
      }),
    );

    this.subscriptions.push(
      this.linkToParamMapIdSubscription<Playlist[]>(
        this.playlistService.getChildrenPlaylists$.bind(this.playlistService),
      ).subscribe((playlists) => {
        this.childPlaylists = playlists;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  openNewPlaylistModal() {
    const modal: ModalComponent<CreatePlaylistData> = this.modalService.open(
      CreatePlaylistModalComponent,
      {
        playlistParentId: this.id,
      },
    );
    this.subscriptions.push(
      modal.closed.subscribe((playlist: CreatePlaylistData) => {
        this.playlistService.addPlaylist(playlist);
      }),
    );
  }

  private linkToParamMapIdSubscription<T>(
    serviceMethod: (id: number) => Observable<T>,
  ): Observable<T> {
    return this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get("id"));
        return serviceMethod(id);
      }),
    );
  }
}
