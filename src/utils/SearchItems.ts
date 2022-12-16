export function FilterSearch(value: any, input: any){
	let array: any = [];

	for (let i = 0; i < value.length; i++) {

		let object_complete = value[i];

		let convert_values_objet_array: any = Object.values(value[i]);

		for (let j = 0; j < convert_values_objet_array.length; j++) {

			let value_only_object = formateString(convert_values_objet_array[j])
			const data_object = convert_values_objet_array[j];

			if(data_object){

				if(value_only_object.includes(formateString(input))){

					if(!array.includes(object_complete)){
						array.push(object_complete)
					}
				}

				if(typeof data_object === "object"){
					const value_object: any = Object.values(data_object)
					const value_only_object = formateString(value_object)

					if(value_only_object.includes(formateString(input))){

						// Se já tiver no array então não grave
						if(!array.includes(object_complete)){
							array.push(object_complete)
						}
					}
				}
			}

		}
	}

	return array;
}

export function formateString(value: string) {
	return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
