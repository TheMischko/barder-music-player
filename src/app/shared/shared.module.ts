import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./controls/button/button.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgIconsModule } from "@ng-icons/core";
import { heroArrowDownCircleSolid } from "@ng-icons/heroicons/solid";
import { SliderComponent } from './controls/slider/slider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ButtonComponent, SliderComponent],
  exports: [ButtonComponent, SliderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgIconsModule.withIcons({heroArrowDownCircleSolid}),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
