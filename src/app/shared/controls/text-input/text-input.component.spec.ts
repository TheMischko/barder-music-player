import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

import { TextInputComponent } from './text-input.component';

@Component({
  template: `<app-text-input [formControl]="control"></app-text-input>`
})
class TestHostComponent {
  control = new FormControl('');
}

describe('TextInputComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent, TestHostComponent],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});