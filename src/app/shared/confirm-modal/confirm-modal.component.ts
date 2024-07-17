import {Component, Input} from '@angular/core';
import {ModalComponent} from "@shared/containers/modal/modal.component";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent extends ModalComponent<boolean>{
  @Input() title: string = "Do you really want to do that?";
  @Input() message: string = "";

  isVisible: boolean = true;
  confirm(){
    this.close(true);
    this.isVisible = false;
  }

  cancel(){
    this.close(false);
    this.isVisible = false;
  }
}
