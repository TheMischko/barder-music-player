import { Component, OnDestroy, OnInit } from "@angular/core";
import { PlayerService } from "@services/player.service";
import { PlaybackSettingsService } from "@services/playback-settings.service";
import { Subscription } from "rxjs";
import { Song } from "../models/music";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.scss",
})
export class PlayerComponent implements OnInit, OnDestroy {
  playingSong: Song;
  private subscriptions: Subscription[] = [];

  constructor(
    private playerService: PlayerService,
    private playbackSettings: PlaybackSettingsService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.playerService.onStartPlaying.subscribe((val) => this.onStartPlaying(val)),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSeek(newPosition: number) {
    this.playerService.seek(newPosition / 1000);
  }

  private onStartPlaying(song: Song) {
    this.playingSong = song;
  }
}
