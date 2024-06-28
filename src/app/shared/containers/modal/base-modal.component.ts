// base-modal.component.ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-base-modal",
  template: `
    <div class="modal" *ngIf="isVisible">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ["./base-modal.component.scss"],
})
export class BaseModalComponent {
  @Input() isVisible: boolean = false;
}
