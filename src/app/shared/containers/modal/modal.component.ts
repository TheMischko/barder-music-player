// modal.component.ts

import { Component, EventEmitter } from "@angular/core";

@Component({
  selector: "app-modal",
  template: "",
})
export class ModalComponent<T> {
  closed = new EventEmitter<T>();
  open() {}
  close(data: T) {
    this.closed.emit(data);
  }
}
