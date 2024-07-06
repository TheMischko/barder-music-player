import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewSongModalComponent } from "./new-song-modal.component";
import { SongFormComponent } from "../../parts/song-form/song-form.component";
import { PlaylistModule } from "../../playlist.module";

describe("NewSongModalComponent", () => {
  let component: NewSongModalComponent;
  let fixture: ComponentFixture<NewSongModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSongModalComponent, SongFormComponent],
      imports: [PlaylistModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewSongModalComponent);
    component = fixture.componentInstance;
    component.playlistId = 1;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
