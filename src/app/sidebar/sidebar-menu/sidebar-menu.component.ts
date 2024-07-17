import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  styleUrl: "./sidebar-menu.component.scss",
})
export class SidebarMenuComponent {
  constructor(private router: Router) {}

  openSettings() {
    this.router.navigate([
      {
        outlets: {
          sidebar: ["settings"],
        },
      },
    ]);
  }

  openHome() {
    this.router.navigate([
      {
        outlets: {
          sidebar: ["home"],
        },
      },
    ]);
  }
}
