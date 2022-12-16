export class ExcelManager {

	public filter(items, keys) {
		var data = [];
		//console.log(keys);
		items.forEach(item => {
			var filtered = {};

			for (var i in keys) {
				if(keys[i] == undefined){
					keys[i] = "";
				}
				if (typeof keys[i] == "string") {
					if (typeof item[Object.keys(item)[i]] == "string") {
						filtered[keys[i]] = item[Object.keys(item)[i]].trim().trimStart();;
					}
					else {
						filtered[keys[i]] = item[Object.keys(item)[i]];
					}
				} else {
					let replaced = item[Object.keys(item)[i]];
					if (!replaced) {
						replaced = "";
					}
					for (var j in keys[i].replace) {
						replaced = replaced.replace(new RegExp(keys[i].replace[j].from, "gi"), keys[i].replace[j].to);
					}
					if (keys[i].converter) {
						filtered[keys[i].name] = keys[i].converter(replaced.trim().trimStart());
					} else {
						filtered[keys[i].name] = replaced.trim().trimStart();
					}
					if (keys[i].validations) {
						for (var key in keys[i].validations) {
							var c_validation = keys[i].validations[key];

							filtered[keys[i].name] = c_validation.validation(keys[i], keys[i])
						}
					}
				}
			}
			data.push(filtered);
		});
		return data;
	}

	public getWorkSheet(row,headers,items) {


		//object.push({ row_values: row.values });
		if (headers.length == 0) {
			row.eachCell(cell => {
				//console.log(cell.value);
				var header = cell.value;
				headers.push(header);
			});
		} else {
			var item = {};
			for (var i = 0; i < headers.length; i++) {
				var normalize = headers[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				var index = normalize.toLowerCase().replace(/\ /g, "_");
				var value = row.getCell(i + 1).value;
				if(value) {
					if(typeof value == "object") {
							if(value.result) {
									item[index] = value.result.toString().trimEnd();
							} else if(value instanceof Date) {
									value.setDate(value.getDate() + 1)
									item[index] = value.getTime();
							}
					} else if(typeof value == "string") {
							item[index] = value.trimEnd();
					} else {
							item[index] = value.toString().trimEnd();
					}
			} else {
					item[index] = "";
			}
			}
			items.push(item);
		}

		return items;
	}
}
