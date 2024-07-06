import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SongFormComponent } from "./song-form.component";
import { PlaylistModule } from "../../playlist.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("SongFormComponent", () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongFormComponent],
      imports: [PlaylistModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
