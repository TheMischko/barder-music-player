import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaybackSettingsService} from "@services/playback-settings.service";
import {Subscription} from "rxjs";
import {LoopState} from "../../player.component.model";

@Component({
  selector: 'app-loop-control',
  templateUrl: './loop-control.component.html',
  styleUrl: './loop-control.component.scss'
})
export class LoopControlComponent implements OnInit,OnDestroy{
  private subscription: Subscription;
  private stateRotation: LoopState[] = [LoopState.None, LoopState.Current, LoopState.Playlist];
  private currentStateIndex: number = 0;
  constructor(private playbackSettings: PlaybackSettingsService) {
  }

  ngOnInit() {
    this.subscription = this.playbackSettings.loop$.subscribe((loopVal: LoopState) => {
      this.currentStateIndex = this.stateRotation.findIndex(state => state === loopVal);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get currentState(): LoopState{
    return this.stateRotation[this.currentStateIndex];
  }

  get loopingActive(): boolean{
    return this.currentState !== LoopState.None;
  }

  rotateNextState(){
    this.currentStateIndex = (this.currentStateIndex+1) % this.stateRotation.length;
    this.playbackSettings.loop = this.currentState;
  }

  protected readonly LoopState = LoopState;
}
