import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { QuickAccessComponent } from "./quick-access/quick-access.component";
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { SharedModule } from "@shared/shared.module";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { ionHomeSharp, ionSettingsSharp } from "@ng-icons/ionicons";
import { SettingsComponent } from "./settings/settings.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: QuickAccessComponent,
    outlet: "sidebar",
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [QuickAccessComponent, SidebarMenuComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes.map((route) => {
        return {
          ...route,
          outlet: "sidebar",
        };
      }),
    ),
    SharedModule,
    NgIcon,
    NgIconsModule.withIcons({ ionSettingsSharp, ionHomeSharp }),
    ReactiveFormsModule,
  ],
  exports: [SidebarMenuComponent],
})
export class SidebarModule {}
