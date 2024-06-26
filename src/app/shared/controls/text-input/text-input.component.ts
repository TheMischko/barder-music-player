import {Component, Input, forwardRef, Injector, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;

  value: string = "";
  isDisabled: boolean = false;
  onChange: (value: string) => void;
  onTouched: () => void;

  control: NgControl;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.control = this.injector.get(NgControl);
    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }

  get classes(): { [key: string]: boolean } {
    return {
      'input-disabled': this.isDisabled,
      'input-filled': this.value.length > 0,
      'input-valid': this.control.valid && this.control.touched,
      'input-invalid': !this.control.valid && this.control.touched
    };
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }
}