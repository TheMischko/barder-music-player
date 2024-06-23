import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Howl, HowlOptions} from "howler";
import {PlaybackSettingsService} from "@services/playback-settings.service";
import {interval, Subscription} from "rxjs";
import {LoopState} from "../player/player.component.model";
import {Song, SongProgress} from "../models/music";
import {ProgressService} from "../player/progress.service";

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
  private nextSongIndex: number;
  private playlist: Howl[];
  private songlist: Song[];
  private playlistIndex: number;
  private readonly progressCheckInterval = 250;
  private readonly preloadTimePortion = .9;
  private playingSongID: number;

  private settingsSubscriptions: Subscription[] = [];
  private progressSubscription: Subscription;
  private songEventsAttached: boolean = false;

  constructor(private playbackSettings: PlaybackSettingsService, private progressService: ProgressService) {
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
          console.log(`Setting looping ${loop === LoopState.Current ? 'on' : 'off'}`);
          this.playingSong.loop(loop === LoopState.Current);
        }
      })
    );
    this.settingsSubscriptions.push(
      this.playbackSettings.mute$.subscribe((muted: boolean) => {
        if(this.playingSong){
          this.playingSong.mute(muted);
        }
      })
    )
  }

  ngOnDestroy() {
    this.settingsSubscriptions.forEach(sub => sub.unsubscribe());
  }

  public setPlaylist(playlist: Song[], startIndex: number = 0){
    this.songlist = [];
    this.playlist = [];
    playlist.forEach((song: Song) => {
      this.songlist.push(song);
      this.playlist.push(this.createHowl(song));
    });
    this.playlistIndex = startIndex;
    this.play();
    this.pause();
  }

  public play(): void{
    if(this.currentSongNotExistsOrOver){
      this.prepareSong();
    }
    this.playingSongID = this.playingSong.play();
  }

  public pause(): void{
    if(this.playingSong){
      this.playingSong.pause();
    }
  }

  public seek(newPosition: number){
    if(!this.playingSongID){
      return;
    }
    if(this.playingSong.duration() <= newPosition){
      this.playingSong.seek(this.playingSong.duration() - 100, this.playingSongID);
      return;
    }
    if(newPosition < 0){
      this.playingSong.seek(0, this.playingSongID);
      return;
    }
    this.playingSong.seek(newPosition, this.playingSongID);
  }

  private get currentSongNotExistsOrOver(){
    return this.playingSong === undefined || this.playingSong.seek() >= this.playingSong.duration()
  }

  private prepareSong(){
    if(this.nextSong === undefined){
      this.playingSong = this.playlist[this.playlistIndex];
    } else {
      this.playingSong = this.nextSong;
      this.nextSong = undefined;
    }
    const loop: boolean = this.playbackSettings.loop$.getValue() === LoopState.Current;
    const volume: number = this.playbackSettings.volume$.getValue();
    const mute: boolean = this.playbackSettings.mute$.getValue();

    this.playingSong.loop(loop);
    this.playingSong.volume(volume);
    this.playingSong.mute(mute);

    if(!this.songEventsAttached) {
      this.playingSong.on('load', () => {
        this.onLoad.emit();
      });
      this.playingSong.on('play', () => {
        this.onStartPlaying.emit(this.songlist[this.playlistIndex]);
        this.progressService.updateCurrentDurationMillis(this.songlist[this.playlistIndex].duration);
        this.startProgressTracking();
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
          this.progressService.updatePlayedLengthMillis(0);
          return;
        }
        const position = (this.playingSong.seek() as number)*1000;
        const duration = this.playingSong.duration() * 1000;

        this.progressService.updatePlayedLengthMillis(position);

        if(position/duration >= this.preloadTimePortion){
          this.preloadNextSong();
        }
    });
  }

  private stopProgressTracking(){
    if(this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  private get isCurrentLastSong(): boolean{
    return this.playlistIndex >= this.playlist.length - 1;
  }

  /**
   * Returns true if current song is last in playlist and the playlist is not repeating, or current song should loop
   * @private
   */
  private get shouldNotPlayNextSong(): boolean{
    const loop = this.playbackSettings.loop$.getValue();
    return loop === LoopState.Current || (this.isCurrentLastSong && loop != LoopState.Playlist)
  }

  private get nextSongIsLoading(){
    const state = this.nextSong.state()
    return state === "loading" || state === "loaded";
  }

  private preloadNextSong(){
    if(this.shouldNotPlayNextSong){
      return;
    }
    if(this.nextSong && this.nextSongIsLoading){
      return;
    }
    this.nextSongIndex = this.isCurrentLastSong ? 0 : this.playlistIndex + 1;
    this.nextSong = this.playlist[this.nextSongIndex].load();
  }

  private playNextSong(){
    if(this.shouldNotPlayNextSong){
      return;
    }
    this.playingSong.unload();
    if(this.nextSong){
      this.playlistIndex = this.nextSongIndex;
      this.songEventsAttached = false;
      this.prepareSong();
      this.play();
      return;
    }
    this.playlistIndex = this.isCurrentLastSong ? 0 : this.playlistIndex + 1;
    this.songEventsAttached = false;
    this.prepareSong();
    this.play();
  }

  createHowl(options: HowlOptions): Howl{
    return new Howl(options);
  }
}
