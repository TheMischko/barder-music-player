import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import {Song} from "../models/music";
import {PlaybackSettingsService} from "@services/playback-settings.service";

describe('PlayerService', () => {
  let service: PlayerService;
  let howlMock: jasmine.Spy;
  let playlist: Song[] = [
    {
      id: "0",
      title: "Test 1",
      playlist: "playlist",
      src: "song.mp3",
      duration: 1000
    },
    {
      id: "0",
      title: "Test 2",
      playlist: "playlist",
      src: "song2.mp3",
      duration: 2000
    }
  ];
  const playbackSettingsService = new PlaybackSettingsService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: PlaybackSettingsService,
        useValue: playbackSettingsService
      }]
    });
    service = TestBed.inject(PlayerService);
    service.setPlaylist(playlist, 0);

    howlMock = spyOn(window as any, 'Howl').and.callFake((config) => {
      return {
        ...config,
        loop: jasmine.createSpy(),
        volume: jasmine.createSpy(),
        on: jasmine.createSpy(),
        play: jasmine.createSpy(),
        pause: jasmine.createSpy()
      };
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
