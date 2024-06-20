import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./controls/button/button.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgIconsModule } from "@ng-icons/core";
import { heroArrowDownCircleSolid } from "@ng-icons/heroicons/solid";

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgIconsModule.withIcons({ heroArrowDownCircleSolid }),
  ],
})
export class SharedModule {}
