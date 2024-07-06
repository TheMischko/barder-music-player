import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlaylistDetailComponent } from "./playlist-detail.component";
import { PlaylistModule } from "../playlist.module";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe("PlaylistDetailComponent", () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistDetailComponent],
      imports: [PlaylistModule, BrowserDynamicTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of([{ id: 1 }]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
