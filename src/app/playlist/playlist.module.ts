import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistLandingComponent } from './playlist-landing/playlist-landing.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: PlaylistLandingComponent}
]

@NgModule({
  declarations: [
    PlaylistLandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PlaylistModule { }
