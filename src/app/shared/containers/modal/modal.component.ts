// modal.component.ts
import { Component } from '@angular/core';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'app-modal',
  template: `
    <app-base-modal [isVisible]="isVisible" (closed)="onClose()">
      <ng-content></ng-content>
    </app-base-modal>
  `
})
export class ModalComponent extends BaseModalComponent {
  open(){
    this.isVisible = true;
  }

  close(){
    this.isVisible = false;
  }
}