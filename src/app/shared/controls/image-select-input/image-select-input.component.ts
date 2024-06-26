import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-image-select-input',
  templateUrl: './image-select-input.component.html',
  styleUrl: './image-select-input.component.scss'
})
export class ImageSelectInputComponent {
  @Input() label: string;
  @Input() initialValue: string;
  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();

  value = '';

  readonly WIDTH = 180;
  readonly HEIGHT = 150;

  images: string[] = [
    'assets/playlist-covers/coastal-village.jpg',
    'assets/playlist-covers/knight-moon-mountains.jpg',
  ];

  trackByImage(index: number, image: string): string {
    return image;
  }

  imageClicked(image: string): void {
    this.value = image;
    this.imageSelected.emit(image);
  }
}
