import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlaylistCardComponent } from "./playlist-card.component";
import { Playlist } from "../../../models/playlist";
import { PlaylistMock } from "@services/playlist.mock";
import { PlaylistModule } from "../../playlist.module";

describe("PlaylistCardComponent", () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;
  let playlist: Playlist = PlaylistMock[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistCardComponent],
      imports: [PlaylistModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistCardComponent);
    component = fixture.componentInstance;
    component.playlist = playlist;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
