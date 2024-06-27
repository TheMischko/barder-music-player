import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopControlComponent } from './loop-control.component';
import {SharedModule} from "@shared/shared.module";
import {heroArrowPathRoundedSquare} from "@ng-icons/heroicons/outline";
import {NgIconsModule} from "@ng-icons/core";

describe('LoopControlComponent', () => {
  let component: LoopControlComponent;
  let fixture: ComponentFixture<LoopControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoopControlComponent],
      imports: [SharedModule, NgIconsModule.withIcons({heroArrowPathRoundedSquare})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoopControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
