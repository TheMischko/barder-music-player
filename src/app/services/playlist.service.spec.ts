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

  });

  it('should add a new playlist', () => {

  });

  it('should add a song to the playlist', () => {

  });
});
