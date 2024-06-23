import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private playedLengthMillisSubject = new BehaviorSubject<number>(0);
  private currentDurationSubject = new BehaviorSubject<number>(1);
  public get playedLengthMillis$(): Observable<number>{
    return this.playedLengthMillisSubject.asObservable();
  }
  public get currentDurationMillis$(): Observable<number>{
    return this.currentDurationSubject.asObservable();
  }
  public updatePlayedLengthMillis(value: number){
    this.playedLengthMillisSubject.next(value);
  }
  public updateCurrentDurationMillis(value: number){
    this.currentDurationSubject.next(value);
  }
}
