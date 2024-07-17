import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { QuickAccessComponent } from "./quick-access/quick-access.component";
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { SharedModule } from "@shared/shared.module";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { ionHomeSharp, ionSettingsSharp } from "@ng-icons/ionicons";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  {
    path: "home",
    component: QuickAccessComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [QuickAccessComponent, SidebarMenuComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgIcon,
    NgIconsModule.withIcons({ ionSettingsSharp, ionHomeSharp }),
  ],
  exports: [SidebarMenuComponent],
})
export class SidebarModule {}
