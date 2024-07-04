import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DialogFilter, open } from "@tauri-apps/api/dialog";

@Component({
  selector: "app-file-select",
  templateUrl: "./file-select.component.html",
  styleUrls: ["./file-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileSelectComponent),
      multi: true,
    },
  ],
})
export class FileSelectComponent implements ControlValueAccessor {
  @Input() extensions: DialogFilter[] = [];
  @Input() directory: boolean = false;
  @Input() multiple: boolean = false;
  @Input() dialogTitle: string = "Select file";

  value: String | null = null;
  onChange: (value: String | null) => void = () => {};
  onTouched: () => void = () => {};

  onFileSelect() {}

  onInputClicked(): void {
    open({
      directory: this.directory,
      multiple: this.multiple,
      title: this.dialogTitle,
      filters: this.extensions,
    }).then((result) => {
      if (Array.isArray(result)) {
        const val = result.join(", ");
        this.writeValue(val);
        this.onChange(val);
        return;
      }
      this.writeValue(result);
      this.onChange(result);
      this.onFileSelect();
    });
  }

  writeValue(newVal: String | null): void {
    this.value = newVal;
  }

  registerOnChange(fn: (val: String | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
