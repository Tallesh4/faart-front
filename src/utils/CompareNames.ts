import { formateString } from "./SearchItems";

export default function CompareNames(a: any, b: any, sort: boolean) {
		a = formateString(String(a).toLowerCase());
		b = formateString(String(b).toLowerCase());

		if (!sort) {
			return (a > b) ? -1 : (a < b) ? 1 : 0;
		}

		return (a < b) ? -1 : (a > b) ? 1 : 0;
	}
