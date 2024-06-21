import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerComponent } from "./player.component";
import { ControlsComponent } from "./controls/controls.component";
import { SharedModule } from "@shared/shared.module";
import {NgIcon, NgIconsModule} from "@ng-icons/core";
import { PlaybarComponent } from './playbar/playbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ionPause,
  ionPlay,
  ionPlayBack,
  ionPlayForward,
  ionShuffle, ionVolumeHighSharp,
  ionVolumeMuteSharp
} from "@ng-icons/ionicons";
import {heroArrowPathRoundedSquare} from "@ng-icons/heroicons/outline";
import { VolumeSliderComponent } from './controls/volume-slider/volume-slider.component';

@NgModule({
  declarations: [PlayerComponent, ControlsComponent, PlaybarComponent, VolumeSliderComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      ionShuffle,
      ionPlayBack,
      ionPlay,
      ionPause,
      ionPlayForward,
      heroArrowPathRoundedSquare,
      ionVolumeMuteSharp,
      ionVolumeHighSharp
    })
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {}
