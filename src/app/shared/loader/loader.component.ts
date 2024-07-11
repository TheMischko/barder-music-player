import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loader",
  template: "<ng-icon name='featherLoader' [ngClass]='classes'></ng-icon>",
  styleUrl: "./loader.component.scss",
})
export class LoaderComponent {
  @Input() size: "small" | "medium" | "large" = "medium";
  get classes() {
    return {
      small: this.size === "small",
      medium: this.size === "medium",
      large: this.size === "large",
    };
  }
}
