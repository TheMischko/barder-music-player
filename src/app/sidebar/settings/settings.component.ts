import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  tokenControl = new FormControl<string>("");
  constructor() {}
}
