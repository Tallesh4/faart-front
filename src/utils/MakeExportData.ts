export default function MakeExportData(exportData: any, itens: any){
	exportData.data = [];

	for (var key in itens) {

		var c_table = itens[key];

		//Um objeto para ser exportado da tabela
		var c_export_item: any = {};

		for (var key2 in c_table) {

			//Verificar se em keys do export_data existe a key do dado da tabela.
			//Se existir vamos adicionar essa linha para o objeto de exportação.
			if (exportData.keys[key2]) {

				var value = c_table[key2];

				if(key2 === "status"){

					value = typeof value == "boolean" ? (value ? "Ativo" : "Inativo") : typeof value == "string" ? value : "";

				} else {
					value = typeof value == "boolean" ? (value ? "Sim" : "Não") : typeof value == "string" ? value : "" + value;
				}

				c_export_item[key2] = String(value).toLocaleUpperCase();
			}
		}

		exportData.data.push(c_export_item);
	}

	return exportData
}
