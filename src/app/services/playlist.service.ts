import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Playlist} from "../models/playlist";
import {PlaylistMock} from "@services/playlist.mock";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: BehaviorSubject<Playlist[]> | null = null;
  constructor() { }

  public get playlists$() {
    if(this.playlists === null) {
      this.playlists = new BehaviorSubject<Playlist[]>([]);
      this.loadPlaylists();
    }
    return this.playlists.asObservable();
  }

  loadPlaylists(): void {
    // Load the playlists from the server
    this.playlists.next(PlaylistMock);
  }
}
