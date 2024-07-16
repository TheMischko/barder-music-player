import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { Playlist } from "../../../models/playlist";
import { Router } from "@angular/router";
import {QueueService} from "@services/queue.service";
import {firstValueFrom, Subscription} from "rxjs";
import {PlayerService} from "@services/player-service/player.service";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrl: "./playlist-card.component.scss",
})
export class PlaylistCardComponent implements OnInit, OnDestroy {
  @Input() playlist: Playlist;

  hover: boolean = false;
  playing: boolean = false;
  playlistPlayingId: number;
  playlistPlayingSubscription: Subscription;
  songPlaying: boolean = false;
  songPlayingSubscription: Subscription;

  constructor(private router: Router, private queueService: QueueService, private playerService: PlayerService) {}

  ngOnInit() {
    this.playlistPlayingSubscription = this.queueService.currentPlaylistId$.subscribe((playlistId) => {
      this.playlistPlayingId = playlistId;
      this.updatePlaying();
    });

    this.songPlayingSubscription = this.playerService.playbackState$.subscribe((state) => {
      this.songPlaying = state;
      this.updatePlaying();
    });
  }

  ngOnDestroy() {
    this.playlistPlayingSubscription.unsubscribe();
    this.songPlayingSubscription.unsubscribe();
  }

  displayDetail(): void {
    this.router.navigate(["/playlist", this.playlist.id]);
  }

  handleClick(e: MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    if(this.playing){
      this.handlePauseClick();
    } else {
      this.handlePlayClick();
    }
  }

  private handlePauseClick(){
    this.playerService.pause();
    this.playing = false;
  }

  private handlePlayClick(){
    if(this.queueService.currentPlaylistId !== this.playlist.id) {
      firstValueFrom(this.queueService.setPlaylist(this.playlist.id, {includeChildren: true}));
    } else {
      this.playerService.play();
    }
  }

  private updatePlaying(){
    if(this.playlistPlayingId === this.playlist.id && this.songPlaying){
      this.playing = true;
      return;
    }
    this.playing = false;
  }
}
