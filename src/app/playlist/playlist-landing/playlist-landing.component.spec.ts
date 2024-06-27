import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLandingComponent } from './playlist-landing.component';
import {PlaylistModule} from "../playlist.module";

describe('PlaylistLandingComponent', () => {
  let component: PlaylistLandingComponent;
  let fixture: ComponentFixture<PlaylistLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistLandingComponent],
      imports: [PlaylistModule]
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
