import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'standard-toolbar',
  templateUrl: './standard-toolbar.component.html',
  styleUrls: ['./standard-toolbar.component.scss']
})
export class StandardToolbarComponent implements OnInit {

  @Input() placeholder: string = "";
  @Input() showButtonAdd: boolean = false;
  @Input() showButtonDelete: boolean = false;

  @Output() openModalNew = new EventEmitter();
  @Output() openModalDelete = new EventEmitter();
  @Output() changeAmount = new EventEmitter();
  @Output() searchValue = new EventEmitter();

  visibleAmount = true;
  amount = [10, 50, 100, 250, 500, 750, 1000];
  archivedButton: boolean = false;

  SearchForm = new FormGroup({
    name: new FormControl("")
  })

  @Input() value: string = "";

  constructor() { }

  ngOnInit(): void {
    this.SearchForm.get("name")?.setValue(this.value);
  }

  setChangeAmount(input: any) {
    const value = parseInt(input.value);
    this.changeAmount.emit(value);
  }

  modalDelete() {
    this.openModalDelete.emit(true);
  }

  searchItem(input: any) {
    let search = input.value
    return this.searchValue.emit(search);
  }

  openModal() {
    this.openModalNew.emit(true);
  }
}
