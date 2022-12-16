import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class RenewPasswordService {
	constructor(
    private http: HttpClient
  ) { }

  resetPassword(id: string, code: string, token: string, password: string): Observable<{ accessToken: string, refreshToken: string }> {
    return this.http.post<{accessToken: string, refreshToken: string}>(`${environment.apiUrl}/password-resets/reset/${id}`, {
      code,
      token,
      password
    });
  }
}
