import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { ProductInterface } from "./product.interface";

@Injectable()
export class ProductService {
	constructor(
    private http: HttpClient
  ) { }

  route = "products";

  private getHeader(): any {
    const headers = new HttpHeaders({
      "x-api-token": environment.apiToken
    })

    return headers;
  }
  getAllItems(
    query?: Record<string, unknown>
  ): Observable<ProductInterface[]> {
    let url = `${environment.apiUrl}/${this.route}?search=`

    if(query) {
      for(const key in query) {
        url += `&${key}=${query[key]}`
      }
    }

    return this.http.get<ProductInterface[]>(url);
  }

  getItems(
    page: number = 1,
    perPage?: number,
    sortBy?: string,
    sort?: string,
    search?: string,
    query?: Record<string, unknown>
  ): Observable<PaginateInterface<ProductInterface>> {
    let url = `${environment.apiUrl}/${this.route}?page=${page}`

    if(perPage) url += "&perPage=" + perPage;
    if(sortBy) url += "&sortBy=" + sortBy;
    if(sort) url += "&sort=" + sort;
    if(search) url += "&search=" + search;
    if(query) {
      for(const key in query) {
        url += `&${key}=${query[key]}`
      }
    }

    return this.http.get<PaginateInterface<ProductInterface>>(url);
  }

  createItem(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(`${environment.apiUrl}/${this.route}`, product, { headers: this.getHeader() });
  }

  updateItem(id: String, product: ProductInterface): Observable<ProductInterface>{
    return this.http.put<ProductInterface>(`${environment.apiUrl}/${this.route}/${id}`, product, { headers: this.getHeader() })
  }

  deleteItem(id: String): Observable<ProductInterface>{
    return this.http.delete<ProductInterface>(`${environment.apiUrl}/${this.route}/${id}`, { headers: this.getHeader() })
  }

  archiveItems(ids: string[], enabled = false): Observable<any> {
		return this.http.patch<any>(`${environment.apiUrl}/${this.route}`, { ids, enabled });
	}

  exportExcel(
    search?: string,
    query?: Record<string, unknown>
  ): Observable<Blob>{
    return this.http.post(`${environment.apiUrl}/${this.route}/excel`, {
      search,
      query
    }, { headers: this.getHeader(), responseType: "blob" })
  }
}
