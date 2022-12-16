import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginateInterface } from '../../paginate.interface';

@Component({
  selector: 'standard-table-tools',
  templateUrl: './standard-table-tools.component.html',
  styleUrls: ['./standard-table-tools.component.scss']
})
export class StandardTableToolsComponent implements OnInit {

  @Input() headers: any[] = [];
  @Input() reportName: string = "";
  @Input() showUpdateButton: boolean = false;
  @Input() showViewButton: boolean = false;
  @Input() showImage: boolean = false;
  @Input() showDeleteButton: boolean = true;
  @Input() showCheckbox: boolean = true;
  @Input() query: PaginateInterface<any> = {
    page: 1,
    perPage: 10,
    countPage: 1,
    sortBy: "createdAt",
    sort: "desc",
    total: 10,
    items: []
  };

  @Output() modalUpdateItem = new EventEmitter();
  @Output() modalViewItem = new EventEmitter();
  @Output() changePageData = new EventEmitter();
  @Output() listItemsDelete = new EventEmitter();
  @Output() sortItemsField = new EventEmitter();
  @Output() exportExcel = new EventEmitter();
  @Output() itemDelete = new EventEmitter();

  listIDsRemove: any = [];
  listItemsTableContainer: any = [];

  @Input() paginationId: string = "paginate";
  @Input() paginationIdTag?: string = "";

  constructor() { }

  ngOnInit(): void {
    this.listItemsTableContainer = this.generatedTable(this.query.items);
  }

  sortItems(field: string) {
    this.sortItemsField.emit(field);
  }

  selectedItemToRemove(item: any) {
    this.listItemsDelete.emit(item);
  }

  openModalUpdateItem(id: any) {
    this.modalUpdateItem.emit(id);
  }

  openModalViewItem(id: any) {
    this.modalViewItem.emit(id);
  }

  changePage(event: any) {
    this.changePageData.emit(event);
  }

  exportTableExcel() {
    this.exportExcel.emit(true);
  }

  deleteItem(itemID: string) {
    this.itemDelete.emit(itemID);
  }

  generatedTable(items: any) {
    const listFinaleTable = [];

    for (let indexItem in items) {
      const listItems = [];
      const item = items[indexItem];

      for (let indexHeaders in this.headers) {
        const header = this.headers[indexHeaders];
        const itemHeader = item[header.key]
        const image = header.image
        if (typeof item === 'object') {
          const keyObject = header.key.split(".");

          if (keyObject.length === 2) {
            listItems.push(item[keyObject[0]][keyObject[1]])
          }
        }

        if (typeof itemHeader !== 'undefined') {
          if (typeof itemHeader === 'boolean') {
            if (itemHeader) {
              listItems.push("Sim")
            } else {
              listItems.push("Não")
            }
          } else {
            listItems.push(itemHeader)
          }
        }
      }

      listFinaleTable.push({
        id: item.id,
        data: listItems
      })
    }

    return listFinaleTable;
  }
}
