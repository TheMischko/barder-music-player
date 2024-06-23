import {Howl, HowlOptions} from 'howler';
export class HowlMock implements Howl{
  public stereo: any;
  public pos: any;
  public orientation: any;
  public pannerAttr: any
  private options: any;
  private volumeLevel: number;
  private isMuted: boolean;
  private isPlaying: boolean;
  private isPaused: boolean;
  private currentId: null;
  private readonly eventHandlers: {};
  private playbackRate: number;
  private looping: boolean;
  private seekPosition: number;
  private _state:  "unloaded" | "loading" | "loaded";
  private _src: string | string[];
  private intervalId: NodeJS.Timeout;
  private intervalPosition: number;
  private readonly INTERVAL_INCREMENT = 10;
  constructor(options: HowlOptions) {
    this.options = options;
    this._src = options.src;
    this._state = 'unloaded';
    this.volumeLevel = options.volume || 1.0;
    this.isMuted = options.mute || false;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentId = null;
    this.eventHandlers = {};
    this.playbackRate = options.rate || 1.0;
    this.looping = options.loop || false;
    this.seekPosition = 0;
  }

  on(event, handler) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
    return this;
  }

  once(event, handler) {
    const onceHandler = (...args) => {
      handler(...args);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
    return this;
  }

  off(event, handler) {
    if (!handler) {
      this.eventHandlers[event] = [];
    } else {
      this.eventHandlers[event] = this.eventHandlers[event].filter(h => h !== handler);
    }
    return this;
  }

  _trigger(event, ...args) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(handler => handler(...args));
    }
  }

  play(spriteOrId) {
    if(this._state === 'unloaded'){
      this.load();
    }
    this.isPlaying = true;
    this.isPaused = false;
    this.currentId = spriteOrId || 0; // Simulating sound ID
    this._trigger('play', this.currentId);

    this.intervalPosition = 0;
    this.seekPosition = 0;
    this.intervalId = setInterval(() => {
      if(this.isPaused){
        return;
      }
      this.intervalPosition += this.INTERVAL_INCREMENT;
      this.seekPosition = this.intervalPosition;
    }, this.INTERVAL_INCREMENT);

    setTimeout(() => {
      clearInterval(this.intervalId);
      this.isPlaying = false;
      this._trigger('end')
    }, HOWL_MOCK_DURATION);

    return this.currentId;
  }

  pause(id) {
    this.isPlaying = false;
    this.isPaused = true;
    this._trigger('pause', id || this.currentId);
    return this;
  }

  stop(id) {
    this.isPlaying = false;
    this.isPaused = false;
    this.seekPosition = 0;
    this._trigger('stop', id || this.currentId);
    return this;
  }

  mute(): boolean;
  mute(muted: boolean, id?: number): this;
  mute(muted?: boolean, id?: number): boolean | this {
    if (muted !== undefined) {
      this.isMuted = muted;
      this._trigger('mute', id || this.currentId);
      return this;
    }
    return this.isMuted;
  }


  volume(): number;
  volume(volume: number, id?: number): this;
  volume(volume?: number, id?: number): number | this {
    if (volume !== undefined) {
      this.volumeLevel = volume;
      this._trigger('volume', id || this.currentId);
      return this;
    }
    return this.volumeLevel;
  }


  fade(from, to, duration, id) {
    this.volumeLevel = to;
    setTimeout(() => this._trigger('fade', id || this.currentId), duration);
    return this;
  }

  rate(): number;
  rate(rate: number, id?: number): this;
  rate(rate?: number, id?: number): number | this {
    if (rate !== undefined) {
      this.playbackRate = rate;
      this._trigger('rate', id || this.currentId);
      return this;
    }
    return this.playbackRate;
  }


  seek(): number;
  seek(seek: number, id?: number): this;
  seek(seek?: number, id?: number): number | this {
    if (seek !== undefined) {
      this.seekPosition = seek;
      this._trigger('seek', id || this.currentId);
      return this;
    }
    return this.seekPosition;
  }


  loop(): boolean;
  loop(loop: boolean, id?: number): this;
  loop(loop?: boolean, id?: number): boolean | this {
    if (loop !== undefined) {
      this.looping = loop;
      this._trigger('loop', id || this.currentId);
      return this;
    }
    return this.looping;
  }

  state(): "unloaded" | "loading" | "loaded" {
    return this._state;
  }

  playing(id) {
    return this.isPlaying && (!id || id === this.currentId);
  }

  duration(id) {
    return HOWL_MOCK_DURATION; // Example: sprite duration
  }

  load() {
    this._state = 'loaded';
    this._trigger('load');
    return this;
  }

  unload() {
    this._state = 'unloaded';
    this.isPlaying = false;
    this.isPaused = false;
    this.currentId = null;
    return null;
  }
}

export const HOWL_MOCK_DURATION = 1000;