import { NgModule } from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { ButtonComponent } from "./controls/button/button.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgIconsModule } from "@ng-icons/core";
import { heroArrowDownCircleSolid } from "@ng-icons/heroicons/solid";
import { SliderComponent } from './controls/slider/slider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CardComponent } from './containers/card/card.component';
import { ModalComponent } from './containers/modal/modal.component';
import { BaseModalComponent } from './containers/modal/base-modal.component';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { ImageSelectInputComponent } from './controls/image-select-input/image-select-input.component';
import { FormFieldComponent } from './containers/form-field/form-field.component';

@NgModule({
  declarations: [ButtonComponent, SliderComponent, CardComponent, ModalComponent, BaseModalComponent, TextInputComponent, ImageSelectInputComponent, FormFieldComponent],
  exports: [ButtonComponent, SliderComponent, CardComponent, ModalComponent, FormFieldComponent, TextInputComponent, ImageSelectInputComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgIconsModule.withIcons({heroArrowDownCircleSolid}),
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class SharedModule {}
