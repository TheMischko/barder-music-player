import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild
} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
  }]
})
export class SliderComponent implements AfterViewInit{
  @Input() max: number = 1;
  @Input() min: number = 0;
  @Input() stepSize: number = 1;
  @Input() sliderControl = new FormControl(0);

  @ViewChild('sliderInput') private slider: ElementRef<HTMLInputElement>;
  value: number = 0;
  disabled: boolean = false;

  private onChange: any = (_: number) => {};
  private onTouched: any = () => {};

  ngAfterViewInit(){
    this.updateSliderBackground();
  }

  public writeValue(value: number): void{
    if(value !== undefined){
      this.value = value;
      this.updateSliderBackground();
    }
  }

  public registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void{
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void{
    this.disabled = isDisabled;
  }

  onSliderChange(event: any){
    this.value = event.target.value;
    this.onChange(this.value);
    this.updateSliderBackground()
  }

  onBlur(){
    this.onTouched();
  }

  private updateSliderBackground(){
    if(!this.slider?.nativeElement){
      return;
    }
    const percentage = (this.value / this.max) * 100;
    this.slider.nativeElement.style.setProperty('--playbar-value', `${percentage}%`);
  }
}
