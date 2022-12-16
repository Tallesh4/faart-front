import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent implements OnInit {

  constructor() { }

  @Input() page: number = 0;
  @Input() paginationId: string = ""
  @Output() numberPage = new EventEmitter<number>();

  ngOnInit(): void {
    if(!this.paginationId){
      this.paginationId = new Date().getTime().toFixed(1);
    }
  }

  changePage(number: number) {
    this.numberPage.emit(number);
  }

}
