import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import {PlaylistMock} from "@services/playlist.mock";

describe('PlaylistService', () => {
  let service: PlaylistService;
  const playlistsMock = PlaylistMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistService);
    spyOn(service, 'loadPlaylists').and.callFake(() => {
      service['playlists'].next(playlistsMock);
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the playlist', fakeAsync(() => {
    service['playlists'] = null;
    const playlists$ = service.playlists$
    tick();
    expect(service.loadPlaylists).toHaveBeenCalled();
    playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length);
    });
  }));

  it('should provide the playlists', () => {
    service.playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length);
    });
  });

  it('should add a new playlist', () => {
    service.playlists$;
    service.addPlaylist(PlaylistMock[0]);
    service.playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length+1);
    });
  });

  it('should add a song to the playlist', () => {
    const playlistIndex = 0;
    const playlistID = playlistsMock[playlistIndex].id;
    const expectedLength = playlistsMock[playlistIndex].songs.length + 1;
    service.playlists$;
    service.addSongToPlaylist(playlistID, playlistsMock[playlistIndex].songs[0]);
    service.playlists$.subscribe((playlists) => {
      expect(playlists[playlistIndex].songs.length).toEqual(expectedLength);
    });
  });

  it('should provide a playlist by ID', () => {
    const playlistIndex = 0;
    const playlistID = playlistsMock[playlistIndex].id;
    service.getPlaylist$(playlistID).subscribe((playlist) => {
      expect(playlist).toEqual(playlistsMock[playlistIndex]);
    });
  });

  it('should provide a playlist by ID that responds to changes', fakeAsync(() => {
    const playlistIndex = 0;
    const playlistID = playlistsMock[playlistIndex].id;
    const expectedLength = playlistsMock[playlistIndex].songs.length + 1;
    let playlist = null;
    service.getPlaylist$(playlistID).subscribe((p) => {
      playlist = p;
    });
    service.addSongToPlaylist(playlistID, playlistsMock[playlistIndex].songs[0]);
    tick();
    expect(playlist.songs.length).toEqual(expectedLength);
  }));

  it('should update the playlist', () => {
    const playlistIndex = 1;
    const playlist = playlistsMock[playlistIndex];
    const newName = 'New name';
    service.playlists$;
    service.updatePlaylist(playlist.id, {
      ...playlist,
      name: newName
    });
    service.getPlaylist$(playlist.id).subscribe((p) => {
      expect(p.name).toEqual(newName);
    });
  });

  it('should remove the playlist', () => {
    const playlistIndex = 1;
    const playlistID = playlistsMock[playlistIndex].id;
    service.playlists$;
    service.removePlaylist(playlistID);
    service.playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length-1);
    });
  });
});
