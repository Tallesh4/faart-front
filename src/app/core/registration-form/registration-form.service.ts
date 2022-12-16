import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { RegistrationFormInterface } from "./registration-form.interface";

@Injectable()
export class RegistrationFormService {
	constructor(
    private http: HttpClient
  ) { }

  router = `registration-form`;

  getItems(
    page: number = 1,
    perPage?: number,
    sortBy?: string,
    sort?: string,
    search?: string,
    query?: Record<string, unknown>
  ): Observable<PaginateInterface<RegistrationFormInterface>> {
    let url = `${environment.apiUrl}/${this.router}?page=${page}`

    if(perPage) url += "&perPage=" + perPage;
    if(sortBy) url += "&sortBy=" + sortBy;
    if(sort) url += "&sort=" + sort;
    if(search) url += "&search=" + search;
    if(query) {
      for(const key in query) {
        url += `&${key}=${query[key]}`
      }
    }

    return this.http.get<PaginateInterface<RegistrationFormInterface>>(url);
  }

  createItem(responsible: RegistrationFormInterface): Observable<RegistrationFormInterface> {
    return this.http.post<RegistrationFormInterface>(`${environment.apiUrl}/${this.router}`, responsible);
  }

  updateItem(id: String, responsible: RegistrationFormInterface): Observable<RegistrationFormInterface>{
    return this.http.put<RegistrationFormInterface>(`${environment.apiUrl}/${this.router}/${id}`, responsible)
  }

  deleteItem(id: String): Observable<RegistrationFormInterface>{
    return this.http.delete<RegistrationFormInterface>(`${environment.apiUrl}/${this.router}/${id}`)
  }

  exportExcel(
    search?: string,
    query?: Record<string, unknown>
  ): Observable<Blob>{
    return this.http.post(`${environment.apiUrl}/${this.router}/excel`, {
      search,
      query
    }, { responseType: "blob" })
  }
}
