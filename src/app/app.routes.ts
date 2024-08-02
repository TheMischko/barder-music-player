import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./playlist/playlist.module").then((m) => m.PlaylistModule),
      },
      {
        path: "",
        outlet: "sidebar",
        loadChildren: () =>
          import("./sidebar/sidebar.module").then((m) => m.SidebarModule),
      },
    ],
  },
];
