import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FilterInterface, SearchFilterInterface } from "./filter.interface";

@Injectable({
    providedIn: "root"
})
export class FilterService {
    constructor(
        private http: HttpClient
    ) {}

    getFilter(search: SearchFilterInterface): Observable<FilterInterface>{
        return this.http.post<FilterInterface>(`${environment.apiUrl}/filters`, search);
    }
}