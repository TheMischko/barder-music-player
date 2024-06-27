import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectInputComponent } from './image-select-input.component';
import {NgOptimizedImage} from "@angular/common";

describe('ImageSelectInputComponent', () => {
  let component: ImageSelectInputComponent;
  let fixture: ComponentFixture<ImageSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageSelectInputComponent],
      imports: [NgOptimizedImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
