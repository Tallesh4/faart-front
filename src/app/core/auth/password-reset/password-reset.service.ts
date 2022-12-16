import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PasswordResetInterface } from "./password.interface";

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {
	constructor(
    private http: HttpClient
  ) { }

  passwordReset(username: string): Observable<PasswordResetInterface> {
    return this.http.post<PasswordResetInterface>(`${environment.apiUrl}/password-resets`, {
      username
    });
  }

  verifyCode(id: string, code: string, token: string): Observable<PasswordResetInterface> {
    return this.http.post<PasswordResetInterface>(`${environment.apiUrl}/password-resets/verify/${id}`, {
      code,
      token
    });
  }
}
