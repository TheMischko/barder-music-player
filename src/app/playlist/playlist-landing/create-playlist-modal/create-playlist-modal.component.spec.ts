import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistModalComponent } from './create-playlist-modal.component';
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('CreatePlaylistModalComponent', () => {
  let component: CreatePlaylistModalComponent;
  let fixture: ComponentFixture<CreatePlaylistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePlaylistModalComponent],
      imports: [SharedModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlaylistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
