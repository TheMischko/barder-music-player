import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerComponent } from "./player.component";
import { ControlsComponent } from "./controls/controls.component";
import { SharedModule } from "@shared/shared.module";
import {NgIcon, NgIconsModule} from "@ng-icons/core";
import { PlaybarComponent } from './playbar/playbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ionPause, ionPlay, ionPlayBack, ionPlayForward, ionShuffle} from "@ng-icons/ionicons";
import {heroArrowPathRoundedSquare} from "@ng-icons/heroicons/outline";

@NgModule({
  declarations: [PlayerComponent, ControlsComponent, PlaybarComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ionShuffle, ionPlayBack, ionPlay, ionPause, ionPlayForward, heroArrowPathRoundedSquare})
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {}
