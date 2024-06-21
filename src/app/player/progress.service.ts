import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private playedLengthMillisSubject = new BehaviorSubject<number>(0)
  public get playedLengthMillis$(): Observable<number>{
    return this.playedLengthMillisSubject.asObservable();
  }
  public updatePlayedLengthMillis(value: number){
    this.playedLengthMillisSubject.next(value);
  }
}
