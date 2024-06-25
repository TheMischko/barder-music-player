import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {ModalComponent} from "@shared/containers/modal/modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: ComponentRef<ModalComponent> | null = null;

  constructor() {
  }
  open<T extends ModalComponent>(modalComponent: Type<T>, viewContainerRef: ViewContainerRef, inputs?: Partial<T>): void{
    this.modal = viewContainerRef.createComponent(modalComponent);
    Object.assign(this.modal.instance, inputs);
    this.modal.instance.open();
  }

  close(): void{
    this.modal?.instance.close();
  }
}
