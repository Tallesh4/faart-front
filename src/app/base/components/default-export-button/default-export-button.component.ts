import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-export-button',
  templateUrl: './default-export-button.component.html',
  styleUrls: ['./default-export-button.component.scss']
})
export class DefaultExportButtonComponent implements OnInit {

  constructor() { }

  @Input() text: string = "Exportar";
  @Input() loadingExport: boolean = false;
  @Output() export = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  exportItems(){
    this.export.emit(true);
  }

}
