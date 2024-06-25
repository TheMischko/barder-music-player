import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ViewChild('footerContent', { static: true }) footerContent: ElementRef;
}
