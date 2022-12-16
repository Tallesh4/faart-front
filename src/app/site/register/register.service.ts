import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegistrationFormInterface } from "src/app/core/registration-form/registration-form.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class RegisterSiteService {
    constructor(
        private http: HttpClient
    ) { }

    createItem(responsible: any): Observable<any> {
        return this.http.post<any>(`http://127.0.0.1:8080/api-site/registration-form`, responsible,{ headers: this.getHeader() });
      }

      
    private getHeader(): any {
        const headers = new HttpHeaders({
            "x-site-token": 'c0d22183-9417-4dda-a5be-0c0ce5808680'
        })

        return headers;
    }
}
