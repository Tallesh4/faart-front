import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from 'src/app/core/user/user.interface';

@Component({
  selector: 'item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements OnInit {

  constructor() { }

  @Input() title: string = "";
  @Input() itemList: UserInterface[] = [];
  @Input() loading: boolean = false;
  @Input() key: string = "";
  @Input() manager: boolean = false;
  @Output() filterSelected = new EventEmitter();

  ngOnInit(): void {
  }

  selected(event: any){
    this.filterSelected.emit({
      key: this.key,
      value: event.value,
      manager: this.manager
    })
  }

}
