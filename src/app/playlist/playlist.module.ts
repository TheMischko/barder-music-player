import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { PlaylistLandingComponent } from "./playlist-landing/playlist-landing.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { AddNewCardComponent } from "./parts/add-new-card/add-new-card.component";
import { NgIconsModule } from "@ng-icons/core";
import {
  ionAddCircleOutline,
  ionMusicalNotes,
  ionMusicalNotesOutline,
} from "@ng-icons/ionicons";
import { CreatePlaylistModalComponent } from "./playlist-landing/create-playlist-modal/create-playlist-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlaylistCardComponent } from "./parts/playlist-card/playlist-card.component";
import { PlaylistDetailComponent } from "./playlist-detail/playlist-detail.component";
import { SongDisplayerComponent } from "./parts/song-displayer/song-displayer.component";
import { SongFormComponent } from "./parts/song-form/song-form.component";
import { NewSongModalComponent } from "./playlist-detail/new-song-modal/new-song-modal.component";

const routes: Routes = [
  { path: "", component: PlaylistLandingComponent },
  { path: "playlist/:id", component: PlaylistDetailComponent },
];

@NgModule({
  declarations: [
    PlaylistLandingComponent,
    AddNewCardComponent,
    CreatePlaylistModalComponent,
    PlaylistCardComponent,
    PlaylistDetailComponent,
    SongDisplayerComponent,
    SongFormComponent,
    NewSongModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgIconsModule.withIcons({
      ionAddCircleOutline,
      ionMusicalNotes,
      ionMusicalNotesOutline,
    }),
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class PlaylistModule {}
