import {Component, OnDestroy} from '@angular/core';
import {ProgressService} from "./progress.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnDestroy{
  songTitle = "Cobblestone village";
  songPlaylist = "Fantasy live music";

  private playing: boolean = false;
  private interval = setInterval(() => {
    if(this.playing){
      this.caret += 100;
      this.progressService.updatePlayedLengthMillis(this.caret);
    }
  }, 100);
  private caret: number = 0;

  constructor(private progressService: ProgressService) {}

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onPlay(){
    this.playing = true;
  }

  onPause(){
    this.playing = false;
  }
}
