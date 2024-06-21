import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { AppComponent } from "./app.component";
import { SharedModule } from "@shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { heroPlaySolid } from "@ng-icons/heroicons/solid";
import {PlayerModule} from "./player/player.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    SharedModule,
    NgIcon,
    NgIconsModule.withIcons({heroPlaySolid, }),
    PlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
