import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaybarComponent } from './playbar.component';
import {SliderComponent} from "@shared/controls/slider/slider.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('PlaybarComponent', () => {
  let component: PlaybarComponent;
  let fixture: ComponentFixture<PlaybarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaybarComponent, SliderComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaybarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
