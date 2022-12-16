
const formatedName = (name: string) => name.toLocaleLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "") //Removendo espaço em branco e acento
export class ExcelImporterModel {
	//Keys de importação
	importers = {
		brand: {
			keys: [
				"name",
				{ name: "concurrent", converter: item => (formatedName(item) != "nao" ? true : false) },
				{ name: "status", converter: item => (item.toLowerCase().trim() == "ativo" ? true : false) },
				{ name: "brand_id", converter: item => (item || "") }
			]
		},
		categories: {
			keys: [
				"name",
				{ name: "category_id", converter: item => (item || "") }
			]
		},
		sub_categories: {
			keys: [
				"name",
				{ name: "sub_category_id", converter: item => (item || "") }
			]
		},
		product: {
			keys: [
				"brand",
				"category",
				"sub_category",
				"description",
				"code_ebs",
				{ name: "status", converter: item => (item.toLowerCase().trim() == "ativo" ? true : false) },
				{ name: "product_id", converter: item => (item || "") }
			],
		},
		users: {
			keys: [
				"work_group_id",
				"hiear",
				"name",
				"last_name",
				"login",
				"password",
				"hired_at",
				"cpf",
				"email",
				"region",
				"registry",
				"complete_address",
				"cep",
				"city",
				"uf",
				{ name: "latlng", converter: item => (item || "") },
				"works_for"
			]
		},
		channels: {
			keys: [
				"channel",
				{ name: "channel_id", converter: item => (item || "") }
			]
		},
		branches: {
			keys: [
				"filial",
				{ name: "filial_id", converter: item => (item || "") }
			]
		},
		pdv: {
			keys:[
				"external_id",
				{ name: "cnpj", replace: [{ from: "[-./ ]", to: "" }], converter: item => ( item.length < 14 ? `0${item}` : item ) },
				"network",
				"flag",
				"trading_name",
				"company_name",
				{ name: "address", converter: item => (item.toLowerCase()) },
				"number",
				{ name: "neighborhood", converter: item => (item.toLowerCase()) },
				{ name: "city", converter: item => (item.toLowerCase()) },
				"uf",
				{ name: "cep", replace: [{ from: "[-. ]", to: "" }] },
				{ name: "pdv_id", converter: item => (item || "")},
			]
		},
	}

	public getImporters(key){
		return this.importers[key];
	}
}
