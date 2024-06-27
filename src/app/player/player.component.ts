import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from "@services/player.service";
import {PlaybackSettingsService} from "@services/playback-settings.service";
import {Subscription} from "rxjs";
import {Song} from "../models/music";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit,OnDestroy{
  private playing: boolean = false;
  playingSong: Song;
  private subscriptions: Subscription[] = [];
  private playlist: Song[] = [
    {
      title: "Cobblestone Village",
      src: "/assets/playlist/Cobblestone_Village.mp3",
      duration: 258000
    },
    {
      title: "Market Town",
      src: "/assets/playlist/Market_Town.mp3",
      duration: 217000
    },
    {
      title: "Timber Town",
      src: "/assets/playlist/Timber_Town.mp3",
      duration: 214000
    },
    {
      title: "Village Atmo KCD",
      src: "/assets/playlist/Village_Atmo_KCD.mp3",
      duration: 78000
    }
  ]

  constructor(private playerService: PlayerService,
              private playbackSettings: PlaybackSettingsService) {}

  ngOnInit() {
    this.subscriptions.push(this.playerService.onStartPlaying.subscribe((val) => this.onStartPlaying(val)))
    this.playerService.setPlaylist(this.playlist, 0);
    this.playingSong = this.playlist[0];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onPlayClick(){
    this.playerService.play();
  }

  onPauseClick(){
    this.playerService.pause();
  }

  onSeek(newPosition: number){
    this.playerService.seek(newPosition/1000);
  }

  private onStartPlaying(song: Song){
    this.playingSong = song;
    this.playing = true;
  }
}
