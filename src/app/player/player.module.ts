import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerComponent } from "./player.component";
import { ControlsComponent } from "./controls/controls.component";
import { SharedModule } from "@shared/shared.module";
import { NgIcon } from "@ng-icons/core";
import { PlaybarComponent } from './playbar/playbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [PlayerComponent, ControlsComponent, PlaybarComponent],
  imports: [CommonModule, SharedModule, NgIcon, FormsModule, ReactiveFormsModule],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {}
