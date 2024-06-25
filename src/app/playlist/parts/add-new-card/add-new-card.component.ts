import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrl: './add-new-card.component.scss'
})
export class AddNewCardComponent {
  isModalOpen: boolean = false;
  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){

  }
}
