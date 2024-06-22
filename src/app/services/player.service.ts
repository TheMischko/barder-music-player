import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Howl} from "howler";
import {PlaybackSettingsService} from "@services/playback-settings.service";
import {interval, Subscription} from "rxjs";
import {LoopState} from "../player/player.component.model";
import {Song, SongProgress} from "../models/music";

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements OnDestroy{
  public onLoad = new EventEmitter();
  public onStartPlaying = new EventEmitter<Song>();
  public onPause = new EventEmitter();
  public onEndPlaying = new EventEmitter();
  public onPlaying = new EventEmitter<SongProgress>();

  private playingSong: Howl;
  private nextSong: Howl;
  private playlist: Song[];
  private playlistIndex: number;
  private readonly progressCheckInterval = 250;
  private readonly preloadTime = 10_000;

  private settingsSubscriptions: Subscription[] = [];
  private progressSubscription: Subscription;
  private songEventsAttached: boolean = false;

  constructor(private playbackSettings: PlaybackSettingsService) {
    this.settingsSubscriptions.push(
      this.playbackSettings.volume$.subscribe((volume) => {
        if(this.playingSong){
          this.playingSong.volume(volume);
        }
      })
    );
    this.settingsSubscriptions.push(
      this.playbackSettings.loop$.subscribe((loop: LoopState) => {
        if(this.playingSong){
          this.playingSong.loop(loop === LoopState.Current);
        }
      })
    )
  }

  ngOnDestroy() {
    this.settingsSubscriptions.forEach(sub => sub.unsubscribe());
  }

  public setPlaylist(playlist: Song[], startIndex: number = 0){
    this.playlist = playlist;
    this.playlistIndex = startIndex;
  }

  public play(): void{
    if(this.currentSongNotExistsOrOver){
      this.prepareSong();
    }
    this.playingSong.play();
  }

  public pause(): void{
    if(this.playingSong){
      this.playingSong.pause();
    }
  }

  private get currentSongNotExistsOrOver(){
    return this.playingSong === undefined || this.playingSong.seek() >= this.playingSong.duration()
  }

  private prepareSong(){
    if(this.nextSong === undefined){
      const song = this.playlist[this.playlistIndex];
      this.playingSong = new Howl({
        src: [song.src],
      });
    } else {
      this.playingSong = this.nextSong;
      this.nextSong = undefined;
      this.playlistIndex += 1;
    }
    const loop: boolean = this.playbackSettings.loop$.getValue() === LoopState.Current;
    const volume: number = this.playbackSettings.volume$.getValue();

    this.playingSong.loop(loop);
    this.playingSong.volume(volume);

    if(!this.songEventsAttached) {
      this.playingSong.on('load', () => {
        this.onLoad.emit();
      });
      this.playingSong.on('play', () => {
        this.onStartPlaying.emit(this.playlist[this.playlistIndex]);
        this.startProgressTracking()
      });
      this.playingSong.on('pause', () => {
        this.onPause.emit();
      });
      this.playingSong.on('end', () => {
        this.stopProgressTracking();
        this.onEndPlaying.emit();
        this.playNextSong();
        this.songEventsAttached = false;
      });
    }
    this.songEventsAttached = true;
  }

  private startProgressTracking(){
    this.progressSubscription = interval(this.progressCheckInterval)
      .subscribe(() => {
        if(this.playingSong === undefined){
          this.onPlaying.emit({
            position: 0,
            duration: 0
          });
          return;
        }
        const position = (this.playingSong.seek() as number)*1000;
        const duration = this.playingSong.duration() * 1000;
        this.onPlaying.emit({
          position,
          duration
        });

        if(duration - position < this.preloadTime){
          this.preloadNextSong();
        }
    });
  }

  private stopProgressTracking(){
    if(this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  private preloadNextSong(){
    if(this.nextSong !== undefined){
      return;
    }
    const loop = this.playbackSettings.loop$.getValue();
    if(loop === LoopState.Current){
      return;
    }
    if(this.playlistIndex < this.playlist.length - 1){
      const nextSongIndex = this.playlistIndex + 1;
      const nextSong = this.playlist[nextSongIndex];
      this.nextSong = new Howl({
        src: [nextSong.src]
      });
      this.nextSong.load();
    } else if(loop === LoopState.Playlist && this.playlistIndex === this.playlist.length - 1){
      const nextSong = this.playlist[0];
      this.nextSong = new Howl({
        src: [nextSong.src]
      });
    }
  }

  private playNextSong(){
    if(this.nextSong){
      this.playlistIndex = (this.playlistIndex + 1) % this.playlist.length;
      this.prepareSong();
      this.play();
      this.songEventsAttached = false;
    }
  }
}