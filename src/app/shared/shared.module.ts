import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./controls/button/button.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgIconsModule } from "@ng-icons/core";
import { heroArrowDownCircleSolid } from "@ng-icons/heroicons/solid";
import { SliderComponent } from './controls/slider/slider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CardComponent } from './containers/card/card.component';
import { ModalComponent } from './containers/modal/modal.component';
import { BaseModalComponent } from './containers/modal/base-modal.component';

@NgModule({
  declarations: [ButtonComponent, SliderComponent, CardComponent, ModalComponent, BaseModalComponent],
  exports: [ButtonComponent, SliderComponent, CardComponent, ModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgIconsModule.withIcons({heroArrowDownCircleSolid}),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
