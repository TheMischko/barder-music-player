import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopControlComponent } from './loop-control.component';

describe('LoopControlComponent', () => {
  let component: LoopControlComponent;
  let fixture: ComponentFixture<LoopControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoopControlComponent]
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
