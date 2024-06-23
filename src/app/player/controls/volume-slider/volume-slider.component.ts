import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {PlaybackSettingsService} from "@services/playback-settings.service";

@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrl: './volume-slider.component.scss'
})
export class VolumeSliderComponent implements OnInit, OnDestroy{
  @Input() initialValue: number = 0;
  @Output() change = new EventEmitter<number>();
  @Output() mute = new EventEmitter<boolean>();

  volumeControl = new FormControl(0);
  muted: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private playbackSettings: PlaybackSettingsService) {
  }

  ngOnInit() {
    this.volumeControl.setValue(this.initialValue);
    this.subscriptions.push(
      this.volumeControl.valueChanges.subscribe(
        (val) => {
          if(this.muted){
            this.muted = false;
            this.mute.emit(this.muted);
            this.playbackSettings.mute = false;
          }
          this.change.emit(val);
          this.playbackSettings.volume = val;
        }
      )
    )
    this.subscriptions.push(
      this.playbackSettings.volume$.subscribe(val => this.volumeControl.setValue(PlaybackSettingsService.parseLogVolumeToLinear(val), {emitEvent: false}))
    );
    this.subscriptions.push(
      this.playbackSettings.mute$.subscribe(val => this.muted = val)
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onMuteClick(){
    this.muted = !this.muted;
    this.mute.emit(this.muted);
    this.playbackSettings.mute = this.muted;
  }
}
