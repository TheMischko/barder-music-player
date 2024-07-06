import { fakeAsync, TestBed, tick } from "@angular/core/testing";

import { PlaylistService } from "./playlist.service";
import { PlaylistMock } from "@services/playlist.mock";
import { TauriService } from "@services/tauri.service";
import { TauriServiceStub } from "../../tests/stubs/tauri.service.stub";

describe("PlaylistService", () => {
  let service: PlaylistService;
  const playlistsMock = PlaylistMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TauriService,
          useValue: new TauriServiceStub(),
        },
      ],
    });
    service = TestBed.inject(PlaylistService);
    spyOn(service, "loadPlaylists").and.callFake(() => {
      service["playlists"].next(playlistsMock);
    });
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should load the playlist", fakeAsync(() => {
    service["playlists"] = null;
    const playlists$ = service.playlists$;
    tick();
    expect(service.loadPlaylists).toHaveBeenCalled();
    playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length);
    });
  }));

  it("should provide the playlists", () => {
    service.playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length);
    });
  });

  it("should add a new playlist", () => {
    service.playlists$;
    service.addPlaylist(PlaylistMock[0]);
    service.playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length + 1);
    });
  });

  it("should provide a playlist by ID", () => {
    const playlistIndex = 0;
    const playlistID = playlistsMock[playlistIndex].id;
    service.getPlaylist$(playlistID).subscribe((playlist) => {
      expect(playlist).toEqual(playlistsMock[playlistIndex]);
    });
  });

  it("should provide a playlist by ID that responds to changes", fakeAsync(() => {
    const playlistIndex = 0;
    const playlistID = playlistsMock[playlistIndex].id;
    let playlist = null;
    service.getPlaylist$(playlistID).subscribe((p) => {
      playlist = p;
    });
    service.updatePlaylist(playlistID, {
      ...playlistsMock[playlistIndex],
      name: "new name",
    });
    tick();
    expect(playlist.name).toEqual("new name");
  }));

  it("should update the playlist", () => {
    const playlistIndex = 1;
    const playlist = playlistsMock[playlistIndex];
    const newName = "New name";
    service.playlists$;
    service.updatePlaylist(playlist.id, {
      ...playlist,
      name: newName,
    });
    service.getPlaylist$(playlist.id).subscribe((p) => {
      expect(p.name).toEqual(newName);
    });
  });

  it("should remove the playlist", () => {
    const playlistIndex = 1;
    const playlistID = playlistsMock[playlistIndex].id;
    service.playlists$;
    service.removePlaylist(playlistID);
    service.playlists$.subscribe((playlists) => {
      expect(playlists.length).toEqual(playlistsMock.length - 1);
    });
  });
});
