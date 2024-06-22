import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import {ControlsComponent} from "./controls/controls.component";
import {VolumeSliderComponent} from "./controls/volume-slider/volume-slider.component";
import {PlaybarComponent} from "./playbar/playbar.component";
import {ButtonComponent} from "@shared/controls/button/button.component";
import {SliderComponent} from "@shared/controls/slider/slider.component";
import {PlayerModule} from "./player.module";

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent, ControlsComponent, VolumeSliderComponent, PlaybarComponent, ButtonComponent, SliderComponent],
      imports: [PlayerModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
