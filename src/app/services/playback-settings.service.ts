import {Injectable} from '@angular/core';
import {LoopState} from "../player/player.component.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaybackSettingsService {
  private _volume = new BehaviorSubject<number>(1);
  private _loop = new BehaviorSubject<LoopState>(LoopState.None);
  public set volume(value: number){
    if(value < 0){
      throw new Error('Cannot set volume below zero.')
    }
    if(value > 1){
      throw new Error('Cannot set volume above one.')
    }
    this._volume.next(value);
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


  constructor() { }
}
