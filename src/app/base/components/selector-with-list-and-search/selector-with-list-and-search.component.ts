import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ClickOutsideWindowsEvent } from 'src/utils/ClickOutsideComponentEvent';

@Component({
  selector: 'app-selector-with-list-and-search',
  templateUrl: './selector-with-list-and-search.component.html',
  styleUrls: ['./selector-with-list-and-search.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectorWithListAndSearchComponent)
	}]
})
export class SelectorWithListAndSearchComponent implements OnInit, ControlValueAccessor {

  @Output() change = new EventEmitter();
  @Input() data: any[] = [];

	@Input() targetKey: string = "name";

	value: string = "";
  currentItemSelected: any;

  @Input() key: number | string = 0

  isListDropped = false;

  constructor() {


  }
	onChange = (item: any) => {}
	writeValue(obj: any): void {
		this.value = obj;
		this.currentItemSelected = this.data.find(i => i.id == obj);
	}
	registerOnChange(fn: (item: any) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {}

  ngOnInit(): void {
  }

  toggleDropList() {
    this.isListDropped = !this.isListDropped;
  }

  closeList(){
    this.isListDropped = false;
  }

  onItemSelected(event: any) {
		this.onChange(event.id);
    this.currentItemSelected = event;

		this.change.emit(event.id);
    this.toggleDropList();
  }



}
