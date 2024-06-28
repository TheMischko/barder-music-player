import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { PlaylistLandingComponent } from './playlist-landing/playlist-landing.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import { AddNewCardComponent } from './parts/add-new-card/add-new-card.component';
import {NgIconsModule} from "@ng-icons/core";
import {ionAddCircleOutline} from "@ng-icons/ionicons";
import { CreatePlaylistModalComponent } from './playlist-landing/create-playlist-modal/create-playlist-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PlaylistCardComponent } from './parts/playlist-card/playlist-card.component';

const routes: Routes = [
  { path: '', component: PlaylistLandingComponent}
]

@NgModule({
  declarations: [
    PlaylistLandingComponent,
    AddNewCardComponent,
    CreatePlaylistModalComponent,
    PlaylistCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgIconsModule.withIcons({ ionAddCircleOutline }),
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class PlaylistModule {}
