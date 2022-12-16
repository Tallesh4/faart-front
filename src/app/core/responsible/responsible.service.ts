import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { ResponsibleInterface } from "./responsible.interface";

@Injectable()
export class ResponsibleService {
	constructor(
    private http: HttpClient
  ) { }

  router = `responsible`;

  getItems(
    page: number = 1,
    perPage?: number,
    sortBy?: string,
    sort?: string,
    search?: string,
    query?: Record<string, unknown>
  ): Observable<PaginateInterface<ResponsibleInterface>> {
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

    return this.http.get<PaginateInterface<ResponsibleInterface>>(url);
  }

  createItem(responsible: ResponsibleInterface): Observable<ResponsibleInterface> {
    return this.http.post<ResponsibleInterface>(`${environment.apiUrl}/${this.router}`, responsible);
  }

  updateItem(id: String, responsible: ResponsibleInterface): Observable<ResponsibleInterface>{
    return this.http.put<ResponsibleInterface>(`${environment.apiUrl}/${this.router}/${id}`, responsible)
  }

  deleteItem(id: String): Observable<ResponsibleInterface>{
    return this.http.delete<ResponsibleInterface>(`${environment.apiUrl}/${this.router}/${id}`)
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
