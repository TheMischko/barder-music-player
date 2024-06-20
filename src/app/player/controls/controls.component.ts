import {Component, EventEmitter, Input, Output} from "@angular/core";
import {LoopState} from "../player.component.model";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrl: "./controls.component.scss",
})
export class ControlsComponent {
  @Input() loopState: LoopState = LoopState.None;
  @Input() shuffleState: boolean = false;
  @Output() shuffle = new EventEmitter<boolean>();
  @Output() previous = new EventEmitter<void>();
  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() loop = new EventEmitter<LoopState>();

  protected playPauseState: "Play" | "Pause" = "Play";
  protected readonly LoopState = LoopState;

  changeShuffle(): void{
    this.shuffleState = !this.shuffleState;
    this.shuffle.emit(this.shuffleState);
  }

  emitPrev(): void{
    this.previous.emit();
  }

  playPauseClicked(): void{
    if(this.playPauseState === "Play"){
      this.playPauseState = "Pause";
      this.play.emit();
      return;
    }
    this.playPauseState = "Play";
    this.pause.emit();
  }

  emitNext(): void{
    this.next.emit();
  }

  changeLoopState(): void{
    if(this.loopState === LoopState.None){
      this.loopState = LoopState.Current;
    }
    else if(this.loopState === LoopState.Current){
      this.loopState = LoopState.Playlist;
    }
    else if(this.loopState === LoopState.Playlist){
      this.loopState = LoopState.None
    }
    this.loop.emit(this.loopState);
  }
}
