import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: '', loadChildren: () => import('./playlist/playlist.module').then(m => m.PlaylistModule) }
];
