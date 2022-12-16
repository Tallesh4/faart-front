import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

interface AddressSearchResult {
	street: string,
	city: string,
	state: string,
}

@Injectable()
export class AddressService {
	constructor(
		private http: HttpClient
	) {}


	searchAddressByZipCode(zipCode: string): Observable<AddressSearchResult> {
		return this.http.get<AddressSearchResult>(`${environment.apiUrl}/addresses/search/${zipCode}`);
	}
}