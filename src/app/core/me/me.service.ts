import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Tokens } from "../../base/guards/token.guard";
import { MeInterface } from "./me.interface";


@Injectable({
	providedIn: "root"
})
export class MeService {
	constructor(
		private http: HttpClient
	) { }

	getMe(): Observable<MeInterface> {
		return this.http.get<MeInterface>(`${environment.apiUrl}/me`);
	}
	checkPermission(permissionTag: string): Observable<boolean> {
		return this.http.get<boolean>(`${environment.apiUrl}/me/permissions/${permissionTag}`);
	}

	refreshToken(refreshToken: string) {
		return this.http.post<Tokens>(`${environment.apiUrl}/token`, {refreshToken: refreshToken});
	}
}
