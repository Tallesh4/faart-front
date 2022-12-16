import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { AssociationInterface } from "./association.interface";

@Injectable()
export class AssociationService {
	constructor(
    private http: HttpClient
  ) { }

  router = `association`;

  getItems(
    page: number = 1,
    perPage?: number,
    sortBy?: string,
    sort?: string,
    search?: string,
    query?: Record<string, unknown>
  ): Observable<PaginateInterface<AssociationInterface>> {
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

    return this.http.get<PaginateInterface<AssociationInterface>>(url);
  }

  getAllItems(): Observable<any> {
    let url = `${environment.apiUrl}/${this.router}`

    return this.http.get<any>(url);
  }

  createItem(responsible: AssociationInterface): Observable<AssociationInterface> {
    return this.http.post<AssociationInterface>(`${environment.apiUrl}/${this.router}`, responsible);
  }

  updateItem(id: String, responsible: AssociationInterface): Observable<AssociationInterface>{
    return this.http.put<AssociationInterface>(`${environment.apiUrl}/${this.router}/${id}`, responsible)
  }

  deleteItem(id: String): Observable<AssociationInterface>{
    return this.http.delete<AssociationInterface>(`${environment.apiUrl}/${this.router}/${id}`)
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
