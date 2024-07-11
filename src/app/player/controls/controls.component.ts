import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { LoopState } from "../player.component.model";
import { PlayerService } from "@services/player.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrl: "./controls.component.scss",
})
export class ControlsComponent implements OnInit, OnDestroy {
  @Input() loopState: LoopState = LoopState.None;
  @Input() shuffleState: boolean = false;
  @Output() shuffle = new EventEmitter<boolean>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() loop = new EventEmitter<LoopState>();

  protected playPauseState: "songIsPlaying" | "songIsPaused" = "songIsPlaying";
  protected readonly LoopState = LoopState;
  protected songIsLoading: boolean = false;

  private playbackStateSubscription: Subscription;
  private songLoadingSubscription: Subscription;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playbackStateSubscription = this.playerService.playbackState$.subscribe(
      (playing) => {
        this.playPauseState = playing ? "songIsPlaying" : "songIsPaused";
      },
    );

    this.songLoadingSubscription = this.playerService.songLoadingState$.subscribe(
      (loading) => {
        this.songIsLoading = loading;
      },
    );
  }

  ngOnDestroy() {
    this.playbackStateSubscription.unsubscribe();
  }

  changeShuffle(): void {
    this.shuffleState = !this.shuffleState;
    this.shuffle.emit(this.shuffleState);
  }

  emitPrev(): void {
    this.previous.emit();
  }

  playPauseClicked(): void {
    if (this.playPauseState === "songIsPlaying") {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }

  emitNext(): void {
    this.next.emit();
  }

  changeLoopState(): void {
    if (this.loopState === LoopState.None) {
      this.loopState = LoopState.Current;
    } else if (this.loopState === LoopState.Current) {
      this.loopState = LoopState.Playlist;
    } else if (this.loopState === LoopState.Playlist) {
      this.loopState = LoopState.None;
    }
    this.loop.emit(this.loopState);
  }
}
