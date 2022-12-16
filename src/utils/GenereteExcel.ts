import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export default function GenerateExcel(fileName: string, model: any, sheetName?: string){

	const { keys, data } = model;
	const headers = [];

	for (const key in keys) {
		headers.push({
			header: keys[key],
			key: key,
			width: 35
		});
	}

	const sheet_name = sheetName;

	var workbook = new Workbook();
	var worksheet: any = workbook.addWorksheet(sheet_name);

	const defaultHeaderStyle: any = {
		fill: {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '004c8c' },
		},
		font: {
			name: 'Arial',
			color: { argb: 'FFFFFF' },
			size: 16,
		},
		height: 20,
	};

	const defaultStyle: any = {
		font: {
			name: 'Arial',
		}
	};

	worksheet.columns = headers;

	for (var i = 0; i < headers.length; i++) {

		for (var key in defaultStyle) {
			worksheet.getColumn(i + 1)[key] = defaultStyle[key];
		}

		worksheet.getRow(1).height = defaultHeaderStyle.height;
		for (var key in defaultHeaderStyle) {
			worksheet.getRow(1).getCell(i + 1)[key] = defaultHeaderStyle[key];
		}
	}

	if (data) {
		for (var i = 0; i < data.length; i++) {
			worksheet.addRow(data[i]);
		}
	}

	workbook.xlsx.writeBuffer().then((data) => {
		let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		fs.saveAs(blob, `${fileName}.xlsx`);
	});
}
