import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressService} from "./progress.service";
import {PlayerService} from "@services/player.service";
import {PlaybackSettingsService} from "@services/playback-settings.service";
import {Subscription} from "rxjs";
import {Song, SongProgress} from "../models/music";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit,OnDestroy{
  songTitle = "Cobblestone village";
  songPlaylist = "Fantasy live music";

  private playing: boolean = false;
  playingSong: Song;
  private subscriptions: Subscription[] = [];
  private playlist: Song[] = [
    {
      title: "Cobblestone Village",
      playlist: "Test playlist",
      src: "/assets/playlist/Cobblestone_Village.mp3",
      duration: 258000
    },
    {
      title: "Market Town",
      playlist: "Test playlist",
      src: "/assets/playlist/Market_Town.mp3",
      duration: 217000
    },
    {
      title: "Timber Town",
      playlist: "Test playlist",
      src: "/assets/playlist/Timber_Town.mp3",
      duration: 214000
    },
    {
      title: "Village Atmo KCD",
      playlist: "Test playlist",
      src: "/assets/playlist/Village_Atmo_KCD.mp3",
      duration: 78000
    }
  ]

  constructor(private progressService: ProgressService,
              private playerService: PlayerService,
              private playbackSettings: PlaybackSettingsService) {}

  ngOnInit() {
    this.subscriptions.push(this.playerService.onStartPlaying.subscribe((val) => this.onStartPlaying(val)))
    this.subscriptions.push(this.playerService.onPlaying.subscribe((val) => this.onPlaying(val)));
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

  private onStartPlaying(song: Song){
    this.playingSong = song;
    this.playing = true;
    console.log(song);
  }

  private onPlaying(progress: SongProgress){
    console.log(progress.position);
    this.progressService.updatePlayedLengthMillis(progress.position);
  }
}
