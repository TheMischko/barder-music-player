import { TauriService } from "@services/tauri.service";
import { Observable, of } from "rxjs";
import { Playlist } from "../../app/models/playlist";

export class TauriServiceStub extends TauriService {
  public invokeCommand<T>(command: string, payload?: any): Observable<T> {
    if (typeof this[command] === "function") {
      return this[command](payload);
    } else {
      throw new Error(`Command: "${command}" is not implemented in TauriServiceStub`);
    }
  }

  create_playlist(payload: { newPlaylist: Playlist }): Observable<Playlist> {
    return of({
      ...payload.newPlaylist,
      id: 999,
      created_at: new Date(),
      songs: [],
    });
  }
}
