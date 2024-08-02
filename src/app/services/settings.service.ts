import { Injectable } from "@angular/core";
import { TauriService } from "@services/tauri.service";
import { catchError, Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private tauriService: TauriService) {}

  getDiscordToken(): Observable<string> {
    return this.get("discord-token");
  }

  setDiscordToken(newToken: string): Observable<string> {
    return this.set("discord-token", newToken);
  }

  public get(key: string): Observable<string> {
    return this.tauriService
      .invokeCommand("read_settings", {
        key: key,
      })
      .pipe(
        map((val: string) => JSON.parse(val)),
        catchError((_) => {
          return "";
        }),
      ) as Observable<string>;
  }

  public set<T>(key: string, val: T): Observable<T> {
    return this.tauriService
      .invokeCommand("write_settings", {
        key,
        val,
      })
      .pipe(map((newVal: string) => JSON.parse(newVal))) as Observable<T>;
  }
}
