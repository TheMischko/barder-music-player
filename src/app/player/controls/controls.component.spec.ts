import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ControlsComponent} from './controls.component';
import {LoopState} from "../player.component.model";
import {ButtonComponent} from "@shared/controls/button/button.component";
import {PlayerModule} from "../player.module";

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsComponent, ButtonComponent],
      imports: [PlayerModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('change shuffle', () => {
    it('should turn off turned on shuffle mode', () => {
      component.shuffleState = false;
      component.changeShuffle();
      expect(component.shuffleState).toBe(true);
    });

    it('should turn on turned off shuffle mode', () => {
      component.shuffleState = true;
      component.changeShuffle();
      expect(component.shuffleState).toBe(false);
    });
  });

  it('should emit previous signal', () => {
    spyOn(component.previous, 'emit');
    component.emitPrev();
    expect(component.previous.emit).toHaveBeenCalled();
  });

  it('should emit play signal', () => {
    spyOn(component.play, 'emit');
    component['playPauseState'] = 'Play';
    component.playPauseClicked();
    expect(component.play.emit).toHaveBeenCalled();
    expect(component['playPauseState']).toBe('Pause');
  });

  it('should emit pause signal', () => {
    spyOn(component.pause, 'emit');
    component['playPauseState'] = 'Pause';
    component.playPauseClicked();
    expect(component.pause.emit).toHaveBeenCalled();
    expect(component['playPauseState']).toBe('Play');
  });

  it('should emit next signal', () => {
    spyOn(component.next, 'emit');
    component.emitNext();
    expect(component.next.emit).toHaveBeenCalled();
  });

  describe('change loop state', () => {

    it('should rotate from None to Current', () => {
      spyOn(component.loop, 'emit');
      component.loopState = LoopState.None;
      component.changeLoopState();
      expect(component.loop.emit).toHaveBeenCalledWith(LoopState.Current);
    });

    it('should rotate from Current to Playlist', () => {
      spyOn(component.loop, 'emit');
      component.loopState = LoopState.Current;
      component.changeLoopState();
      expect(component.loop.emit).toHaveBeenCalledWith(LoopState.Playlist);
    });

    it('should rotate from Playlist to None', () => {
      spyOn(component.loop, 'emit');
      component.loopState = LoopState.Playlist;
      component.changeLoopState();
      expect(component.loop.emit).toHaveBeenCalledWith(LoopState.None);
    });
  })
});
