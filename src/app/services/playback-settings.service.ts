import {Injectable} from '@angular/core';
import {LoopState} from "../player/player.component.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaybackSettingsService {
  private _volume = new BehaviorSubject<number>(1);
  private _loop = new BehaviorSubject<LoopState>(LoopState.None);
  private _mute = new BehaviorSubject<boolean>(false);

  /**
   * Sets up the global volume of songs.
   * @param value Volume in range of (0, 100)
   */
  public set volume(value: number){
    if(value < 0){
      throw new Error('Cannot set volume below zero.')
    }
    if(value > 100){
      throw new Error('Cannot set volume above one.')
    }
    this._volume.next(PlaybackSettingsService.parseVolumeLog(value));
  }
  public get volume$(): BehaviorSubject<number>{
    return this._volume;
  }

  public set loop(value: LoopState){
    this._loop.next(value);
  }
  public get loop$(): BehaviorSubject<LoopState>{
    return this._loop;
  }

  public get mute$(): BehaviorSubject<boolean>{
    return this._mute;
  }
  public set mute(val: boolean){
    this._mute.next(val);
  }

  constructor() { }

  /**
   * Takes volume in range (0,100) and scales it to a range of (0,1) with logarithmic scale.
   * @param rawVal number
   * @private
   */
  public static parseVolumeLog(rawVal: number){
    return Math.log10(1 + 9 * (rawVal/100));
  }

  /**
   * Takes volume used for audio output on logarithmic scale and scales it back to a range of (0, 100) on linear scale.
   * @param scaledValue
   */
  public static parseLogVolumeToLinear(scaledValue: number){
    return ((Math.pow(10, scaledValue) - 1) / 9) * 100;
  }
}
