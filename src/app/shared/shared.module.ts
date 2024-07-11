import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ButtonComponent } from "./controls/button/button.component";
import { NgIconsModule } from "@ng-icons/core";
import { heroArrowDownCircleSolid } from "@ng-icons/heroicons/solid";
import { SliderComponent } from "./controls/slider/slider.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardComponent } from "./containers/card/card.component";
import { ModalComponent } from "./containers/modal/modal.component";
import { BaseModalComponent } from "./containers/modal/base-modal.component";
import { TextInputComponent } from "./controls/text-input/text-input.component";
import { ImageSelectInputComponent } from "./controls/image-select-input/image-select-input.component";
import { FormFieldComponent } from "./containers/form-field/form-field.component";
import { CollapsibleContainerComponent } from "./collapsible-container/collapsible-container.component";
import { ionChevronDownSharp } from "@ng-icons/ionicons";
import { FileSelectComponent } from "./controls/file-select/file-select.component";
import { LoaderComponent } from "./loader/loader.component";
import { featherLoader } from "@ng-icons/feather-icons";

@NgModule({
  declarations: [
    ButtonComponent,
    SliderComponent,
    CardComponent,
    ModalComponent,
    BaseModalComponent,
    TextInputComponent,
    ImageSelectInputComponent,
    FormFieldComponent,
    CollapsibleContainerComponent,
    FileSelectComponent,
    LoaderComponent,
  ],
  exports: [
    ButtonComponent,
    SliderComponent,
    CardComponent,
    ModalComponent,
    FormFieldComponent,
    TextInputComponent,
    ImageSelectInputComponent,
    BaseModalComponent,
    CollapsibleContainerComponent,
    FileSelectComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      heroArrowDownCircleSolid,
      ionChevronDownSharp,
      featherLoader,
    }),
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class SharedModule {}
