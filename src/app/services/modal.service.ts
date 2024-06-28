import {
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef,
} from "@angular/core";
import { ModalComponent } from "@shared/containers/modal/modal.component";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private modal: ComponentRef<ModalComponent<any>> | null = null;
  private closedSubscription: Subscription | null = null;
  private _viewContainerRef: ViewContainerRef | null = null;
  private get viewContainerRef(): ViewContainerRef {
    if (!this._viewContainerRef) {
      throw new Error(
        "Root view container ref is not set. Please call setRootViewContainerRef() before calling open()",
      );
    }
    return this._viewContainerRef;
  }

  constructor() {}
  open<T extends ModalComponent<R>, R>(
    modalComponent: Type<T>,
    inputs?: Partial<T>,
  ): ModalComponent<R> {
    this.modal = this.viewContainerRef.createComponent(modalComponent);
    Object.assign(this.modal.instance, inputs);
    this.modal.instance.open();
    this.modal.instance.closed.subscribe((_) => this.closeModal());
    return this.modal.instance;
  }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }

  private closeModal() {
    if (this.modal) {
      this.modal.destroy();
      this.modal = null;
    }
    if (this.closedSubscription) {
      this.closedSubscription.unsubscribe();
      this.closedSubscription = null;
    }
  }
}
