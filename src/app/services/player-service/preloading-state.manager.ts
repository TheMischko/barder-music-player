import { PreloadingState, PreloadingStateRecord } from "./preloading-state";
import { EventEmitter } from "@angular/core";
import { interval, Subscription } from "rxjs";

export class PreloadingStateManager {
  public unload = new EventEmitter<number>();

  private readonly CHECK_INTERVAL = 5000;
  private readonly MAX_ALLOWED_AGE = 1_800_000;

  private states: { [songId: number]: PreloadingStateRecord } = {};
  private intervalSubscription: Subscription;
  constructor() {
    this.intervalSubscription = interval(this.CHECK_INTERVAL).subscribe(() => {
      Object.keys(this.states)
        .filter((songId) => {
          const state: PreloadingStateRecord = this.states[songId];
          if (!state) {
            return false;
          }
          return (
            Math.abs(new Date().getTime() - state.timestamp.getTime()) >
            this.MAX_ALLOWED_AGE
          );
        })
        .forEach((oldSongId) => {
          this.unload.emit(Number(oldSongId));
          this.states[oldSongId] = undefined;
        });
    });
  }

  public getState(songId: number): PreloadingState {
    if (!this.states[songId]) {
      this.changeState(songId, PreloadingState.NotStarted);
    }
    return this.states[songId].state;
  }

  public changeState(songId: number, state: PreloadingState) {
    this.states[songId] = {
      state,
      timestamp: new Date(),
    };
  }
}
