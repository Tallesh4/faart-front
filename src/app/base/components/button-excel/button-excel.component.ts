import { Component, Input } from '@angular/core';
import GenerateExcel from 'src/utils/GenereteExcel';
import MakeExportData from 'src/utils/MakeExportData';

@Component({
	selector: 'button-excel',
	templateUrl: './button-excel.component.html',
	styleUrls: ['./button-excel.component.scss']
})
export class ButtonExcelComponent {

	constructor( ) { }

	loadingExport = false;

	@Input() modelExport: any = {}
	@Input() tableData = {}
	@Input() reportName = "";

	exportTableExcel() {

    this.loadingExport = true;
    this.modelExport = MakeExportData(this.modelExport, this.tableData);

    console.log(this.modelExport);

    GenerateExcel(this.reportName, this.modelExport);

		this.loadingExport = false;
	}
}
