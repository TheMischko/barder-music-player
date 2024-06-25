// base-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-modal',
  template: `
    <div class="modal" *ngIf="isVisible">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
      <button (click)="onClose()">Close</button>
    </div>
  `,
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent {
  @Input() isVisible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  onClose(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}