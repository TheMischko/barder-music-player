import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrl: './volume-slider.component.scss'
})
export class VolumeSliderComponent implements OnInit, OnDestroy{
  @Input() initialValue: number = 0;
  @Output() change = new EventEmitter<number>();
  @Output() mute = new EventEmitter<boolean>();

  volumeControl = new FormControl(0);
  muted: boolean = false;

  private changeSubscription: Subscription;

  ngOnInit() {
    this.volumeControl.setValue(this.initialValue);
    this.changeSubscription = this.volumeControl.valueChanges.subscribe(
      (val) => {
        if(this.muted){
          this.muted = false;
          this.mute.emit(this.muted);
        }
        this.change.emit(val)
      }
    );
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }

  onMuteClick(){
    this.muted = !this.muted;
    this.mute.emit(this.muted);
  }
}
