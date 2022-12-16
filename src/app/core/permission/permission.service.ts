import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { PermissionInterface } from "./permission.interface";

@Injectable()
export class PermissionService {
	constructor(
		private http: HttpClient
	) {}
	getPermissions(
			page: number = 1,
			perPage?: number,
			sortBy?: string,
			sort?: string,
			search?: string,
			query?: Record<string, unknown>
		): Observable<PaginateInterface<PermissionInterface>> {
		let url = `${environment.apiUrl}/permissions?page=${page}`

		if(perPage) url += "&perPage=" + perPage;
		if(sortBy) url += "&sortBy=" + sortBy;
		if(sort) url += "&sort=" + sort;
		if(search) url += "&search=" + search;
		if(query) {
			for(const key in query) {
				url += `&${key}=${query[key]}`
			}
		}

		return this.http.get<PaginateInterface<PermissionInterface>>(url);
	}
	getAllPermissions(search?: string, query?: Record<string, unknown>) {
		let url = `${environment.apiUrl}/permissions`;
		return this.http.get<PermissionInterface[]>(url);
	}
	createPermission(props: PermissionInterface): Observable<PermissionInterface> {
		return this.http.post<PermissionInterface>(`${environment.apiUrl}/permissions`, props);
	}
	updatePermission(id: string, props: PermissionInterface): Observable<PermissionInterface> {
		return this.http.put<PermissionInterface>(`${environment.apiUrl}/permissions/${id}`, props);
	}
	deletePermission(id: string): Observable<PermissionInterface> {
		return this.http.delete<PermissionInterface>(`${environment.apiUrl}/permissions/${id}`);
	}
	archivePermissions(ids: string[], enabled = false): Observable<any> {
		return this.http.patch<any>(`${environment.apiUrl}/permissions`, { ids, enabled });
	}
}
