import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDisplayerComponent } from './song-displayer.component';

describe('SongDisplayerComponent', () => {
  let component: SongDisplayerComponent;
  let fixture: ComponentFixture<SongDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongDisplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
