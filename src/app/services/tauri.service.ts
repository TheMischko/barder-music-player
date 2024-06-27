import { Injectable } from '@angular/core';
import {invoke} from "@tauri-apps/api/tauri";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TauriService {
  invokeCommand<T>(command: string, payload?: any): Observable<T> {
    return new Observable<T>(subscriber => {
      invoke<T>(command, payload)
        .then(response => {
          subscriber.next(response);
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    })
  }
}
