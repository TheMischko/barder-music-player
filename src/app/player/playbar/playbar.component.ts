import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProgressService} from "../progress.service";

@Component({
  selector: 'app-playbar',
  templateUrl: './playbar.component.html',
  styleUrls: ['./playbar.component.scss']
})
export class PlaybarComponent implements OnInit, OnDestroy{
  @Input() trackLengthMillis: number = 63000;
  @Input() playedLengthMillis: number = 0;
  @Output() seek = new EventEmitter<number>();

  sliderValue = new FormControl(0);
  private subscriptions: Subscription[] = [];
  @ViewChild('sliderInput') private slider: ElementRef<HTMLInputElement>;

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    const progressSubscription = this.progressService.playedLengthMillis$.subscribe(value => {
      this.sliderValue.setValue(value, { emitEvent: false });
    });
    this.subscriptions.push(progressSubscription);

    const sliderSubscription = this.sliderValue.valueChanges.subscribe(value => {
      console.log(value);
      this.seek.emit(value);
    });
    this.subscriptions.push(sliderSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get trackLengthTime(): string{
    return this.convertMillisToTime(this.trackLengthMillis);
  }

  get playedLengthTime(): string{
    return this.convertMillisToTime(Number(this.sliderValue.value));
  }

  private convertMillisToTime(milliseconds: number): string{
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
}
