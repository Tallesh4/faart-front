import { FilterSearch } from "./SearchItems";

export default function ValidationValueExists(value: string, data: Array<any>, dataFilter: Array<any>){
		const verify_Items_Array = FilterSearch(data, String(value).trim());
		const verify_Items_Array_Filter = FilterSearch(dataFilter, String(value).trim());

		if(verify_Items_Array.length || verify_Items_Array_Filter.length){

			return {
				status: "error",
				message: "value exists",
				body: verify_Items_Array || verify_Items_Array_Filter
			}
		}

		return {
			status: "success",
			message: "value not exists",
			body: []
		}
}
