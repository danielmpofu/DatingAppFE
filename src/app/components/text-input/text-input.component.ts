import {Component, forwardRef, Input, OnInit, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() type: string = 'text'
  @Input() name: string = ''

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.name = this.label.replace(" ", "");
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
