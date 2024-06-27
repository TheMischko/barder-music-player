import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Playlist} from "../models/playlist";
import {PlaylistMock} from "@services/playlist.mock";
import {Song} from "../models/music";
import {map} from "rxjs/internal/operators/map";
import {TauriService} from "@services/tauri.service";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: BehaviorSubject<Playlist[]> | null = null;
  constructor(private tauriService: TauriService) { }

  public get playlists$() {
    if(this.playlists === null) {
      this.playlists = new BehaviorSubject<Playlist[]>([]);
      this.loadPlaylists();
    }
    return this.playlists.asObservable();
  }

  public getPlaylist$(playlistID: string) {
    return this.playlists$.pipe(
      map(playlists => playlists.find(playlist => playlist.id === playlistID)
    ));
  }

  loadPlaylists(): void {
    // Load the playlists from the provider
    this.tauriService.invokeCommand<Playlist[]>('get_all_playlists')
      .subscribe(playlists => {
        this.playlists.next(playlists);
    });
  }

  addPlaylist(playlist: Playlist): void {
    // Push changes to the provider
    this.tauriService.invokeCommand('create_playlist', playlist)
      .subscribe(playlist => {
      this.playlists.next([...this.playlists.value, playlist as Playlist]);
    });
  }

  addSongToPlaylist(playlistID: string, song: Song){
    const playlistIndex = this.playlists.value.findIndex(
      (playlist) => playlist.id === playlistID
    );
    if(playlistIndex === -1) {
      throw new Error('Playlist not found');
    }
    const playlists = this.playlists.value;
    playlists[playlistIndex].songs.push(song);
    this.playlists.next(playlists);
  }

  updatePlaylist(playlistID: string, updatedPlaylist: Playlist) {
    const playlistIndex = this.playlists.value.findIndex(playlist => playlist.id === playlistID);
    if(playlistIndex === -1) {
      throw new Error('Playlist not found');
    }
    const playlists = this.playlists.value;
    this.playlists.next([...playlists.slice(0, playlistIndex), updatedPlaylist, ...playlists.slice(playlistIndex + 1)]);
  }

  removePlaylist(playlistID: string) {
    const playlistIndex = this.playlists.value.findIndex(playlist => playlist.id === playlistID);
    if(playlistIndex === -1) {
      throw new Error('Playlist not found');
    }
    const playlists = this.playlists.value;
    this.playlists.next([...playlists.slice(0, playlistIndex), ...playlists.slice(playlistIndex + 1)]);
  }
}
