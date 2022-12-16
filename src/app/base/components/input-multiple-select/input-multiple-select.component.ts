import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const $: any;


@Component({
  selector: 'inputSelect',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputMultipleSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputMultipleSelectComponent), multi: true }
  ],
  templateUrl: 'input-multiple-select.component.html',
  styleUrls: ['input-multiple-select.component.scss']
})
export class InputMultipleSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() label = '';
  @Input() help = '';
  @Input() title = '';
  @Input() disabled = '';
  @Input() option: any[] = [];
  @Input() formControlName: any;

  private readonly errorMessages = {
    'required': () => 'Este campo é requerido.'
  };
  protected innerValue: any;
  private control!: FormControl;

  private propagateChange = (_: any) => {
  };

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('select', this.el.nativeElement).selectpicker({
      iconBase: 'ti',
      tickIcon: 'ti-check'
    });
  }

  onChange(event: any) {
    console.log(event)
    this.propagateChange($('select', this.el.nativeElement).val());
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  writeValue(v: any): void {
    if (v !== undefined) {
      this.value = v;
    }
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  validate(c: FormControl) {
    this.control = c;
  }

}