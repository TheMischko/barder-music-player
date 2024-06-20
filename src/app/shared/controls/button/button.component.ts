import { Component, Input } from "@angular/core";
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  @Input() color: "primary" | "secondary" | "danger" = "primary";
  @Input() type: "fill" | "outline" | "plain" = "fill";
  @Input() circular: boolean = false;

  public get classes() {
    return {
      "col-primary": this.color === "primary",
      "col-secondary": this.color === "secondary",
      "col-danger": this.color === "danger",
      "style-fill": this.type === "fill",
      "style-outline": this.type === "outline",
      "style-plain": this.type === "plain",
      circular: this.circular,
    };
  }
}
