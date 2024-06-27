import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCardComponent } from './add-new-card.component';
import {SharedModule} from "@shared/shared.module";
import {NgIconsModule} from "@ng-icons/core";
import {ionAddCircleOutline} from "@ng-icons/ionicons";
import {PlaylistModule} from "../../playlist.module";

describe('AddNewCardComponent', () => {
  let component: AddNewCardComponent;
  let fixture: ComponentFixture<AddNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCardComponent],
      imports: [PlaylistModule, SharedModule, NgIconsModule.withIcons({ionAddCircleOutline})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
