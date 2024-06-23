import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import {Song} from "../models/music";
import {PlaybackSettingsService} from "@services/playback-settings.service";
import {HowlMock} from "../../tests/mocks/HowlMock";
import {HowlOptions} from "howler";
describe('PlayerService', () => {
  let service: PlayerService;
  let howlMock: HowlMock;
  let playlistMock: Song[] = [
    {
      id: "0",
      title: "Test 1",
      playlist: "playlist",
      src: "song.mp3",
      duration: 100
    },
    {
      id: "0",
      title: "Test 2",
      playlist: "playlist",
      src: "song2.mp3",
      duration: 100
    },
    {
      id: "0",
      title: "Test 3",
      playlist: "playlist",
      src: "song3.mp3",
      duration: 100
    },
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

    spyOn(service, 'createHowl').and.callFake((options: HowlOptions) => {
      howlMock = new HowlMock(options);
      spyOn(howlMock, 'play').and.callThrough();
      spyOn(howlMock, 'pause').and.callThrough();
      spyOn(howlMock, 'volume').and.callThrough();
      spyOn(howlMock, 'loop').and.callThrough();
      spyOn(howlMock, 'seek').and.callThrough();
      spyOn(howlMock, 'rate').and.callThrough();
      spyOn(howlMock, 'mute').and.callThrough();
      spyOn(howlMock, 'duration').and.callThrough();
      spyOn(howlMock, 'on').and.callThrough();
      spyOn(howlMock, 'off').and.callThrough();

      return howlMock;
    });

    service.setPlaylist(playlistMock, 0);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set playlist correctly', () => {
    const playlist = [playlistMock[0]];
    service.setPlaylist(playlist);
    expect(service['playlist']).toEqual(playlist);
    expect(service['playlistIndex']).toBe(0);
  });

  it('should play the song', () => {
    service.play();
    expect(service['playingSong'].play).toHaveBeenCalled();
  });

  it('should pause the song', () => {
    service.play();
    service.pause();
    expect(service['playingSong'].pause).toHaveBeenCalled();
  });

  it('should emit onLoad event', () => {
    const spy = spyOn(service.onLoad, 'emit');
    service.play();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onStartPlaying event', () => {
    const spy = spyOn(service.onStartPlaying, 'emit');
    service.play();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onPause event', () => {
    const spy = spyOn(service.onPause, 'emit');
    service.play();
    service.pause();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onEndPlaying event', fakeAsync(() => {
    const spy = spyOn(service.onEndPlaying, 'emit');
    service.play();
    flush();
    expect(spy).toHaveBeenCalled();
  }));

});
