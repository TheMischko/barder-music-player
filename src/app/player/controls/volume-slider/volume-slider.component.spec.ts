import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VolumeSliderComponent } from './volume-slider.component';
import {SliderComponent} from "@shared/controls/slider/slider.component";
import {ButtonComponent} from "@shared/controls/button/button.component";
import {PlayerModule} from "../../player.module";

describe('VolumeSliderComponent', () => {
  let component: VolumeSliderComponent;
  let fixture: ComponentFixture<VolumeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolumeSliderComponent, SliderComponent, ButtonComponent],
      imports: [PlayerModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
