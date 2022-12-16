import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class IconService {
    constructor(
        private http: HttpClient
    ) {}

    getIcon(number: number): Observable<Blob>{
        return this.http.get(`${environment.apiUrl}/icon/${number}`,  { responseType: "blob" });
      }
    
}