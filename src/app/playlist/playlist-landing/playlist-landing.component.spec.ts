import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLandingComponent } from './playlist-landing.component';

describe('PlaylistLandingComponent', () => {
  let component: PlaylistLandingComponent;
  let fixture: ComponentFixture<PlaylistLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
