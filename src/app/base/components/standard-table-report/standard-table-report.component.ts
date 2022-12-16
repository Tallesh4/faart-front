import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'standard-table-report',
  templateUrl: './standard-table-report.component.html',
  styleUrls: ['./standard-table-report.component.scss']
})
export class StandardTableReportComponent implements OnInit {

  constructor() { }

  @Input() headerPrimary: any[] = [];
  @Input() headerSecondary: any[] = [];
  @Input() listItems: any[] = [];
  @Output() exportTable = new EventEmitter<boolean>();

  tableDataPrimaryItems: any[] = [];
  tableDataSecondaryItems: any[] = [];

  page: any;
  itemsPerPage: number = 10;

  ngOnInit(): void {
    this.setConfigTable(this.headerPrimary, this.tableDataPrimaryItems);
    this.setConfigTable(this.headerSecondary, this.tableDataSecondaryItems);
  }

  setConfigTable(headerConfigItems: any[], body: any[]){
    const header: any = [];

    this.listItems.forEach((item: any) => {
      const headerItems: any = {};

      for(let key in item){
        const findDataHeader = headerConfigItems.find((element => element.key === key))

        if(findDataHeader){
          headerItems[key] = item[key];
        }
      }

      header.push(headerItems);
    });
    
    header.forEach((item: any) => {
      const header = []

      for(let key in item){
        header.push(item[key])
      }

      body.push(header)
    });

    }

  exportExcel(){
    this.exportTable.emit(true);
  }
}
