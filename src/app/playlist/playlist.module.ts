import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistLandingComponent } from './playlist-landing/playlist-landing.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import { AddNewCardComponent } from './parts/add-new-card/add-new-card.component';
import {NgIconsModule} from "@ng-icons/core";
import {ionAddCircleOutline} from "@ng-icons/ionicons";

const routes: Routes = [
  { path: '', component: PlaylistLandingComponent}
]

@NgModule({
  declarations: [
    PlaylistLandingComponent,
    AddNewCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgIconsModule.withIcons({ionAddCircleOutline})
  ]
})
export class PlaylistModule { }
