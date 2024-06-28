import { Component, ViewContainerRef } from "@angular/core";
import { ModalService } from "@services/modal.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
    modalService.setRootViewContainerRef(viewContainerRef);
  }
}
