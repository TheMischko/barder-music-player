import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSongModalComponent } from './new-song-modal.component';

describe('NewSongModalComponent', () => {
  let component: NewSongModalComponent;
  let fixture: ComponentFixture<NewSongModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSongModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
