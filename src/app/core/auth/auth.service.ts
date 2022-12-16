import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CryptoService } from "src/app/base/services/crypto.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { VerifyInterface } from "./verify/verify.interface";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(
		private http: HttpClient,
		private cryptoService: CryptoService
	) { }

	login(username: string, password: string): Observable<VerifyInterface> {
		return this.http.post<VerifyInterface>(`${environment.apiUrl}/login`, {username, password});
	}

	verify(id: string, token: string, code: string): Observable<{accessToken: string, refreshToken: string}> {
		return this.http.post<{accessToken: string, refreshToken: string}>(`${environment.apiUrl}/verify/${id}`, {token, code});
	}
}
