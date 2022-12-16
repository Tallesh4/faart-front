import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class HomeSiteService {
    constructor(
        private http: HttpClient
    ) { }
    getAllProducts(): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:8080/api-site/products`, { headers: this.getHeader() });
    }

    private getHeader(): any {
        const headers = new HttpHeaders({
            "x-site-token": 'c0d22183-9417-4dda-a5be-0c0ce5808680'
        })

        return headers;
    }
}
