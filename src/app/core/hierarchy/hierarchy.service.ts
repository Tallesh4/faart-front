import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { HierarchyInterface } from "./hierarchy.interface";

@Injectable()
export class HierarchyService {
	constructor(
		private http: HttpClient
	) {}
	getHierarchies(
			page: number = 1,
			perPage?: number,
			sortBy?: string,
			sort?: string,
			search?: string,
			query?: Record<string, unknown>
		): Observable<PaginateInterface<HierarchyInterface>> {
		let url = `${environment.apiUrl}/hierarchies?page=${page}`

		if(perPage) url += "&perPage=" + perPage;
		if(sortBy) url += "&sortBy=" + sortBy;
		if(sort) url += "&sort=" + sort;
		if(search) url += "&search=" + search;
		if(query) {
			for(const key in query) {
				url += `&${key}=${query[key]}`
			}
		}

		return this.http.get<PaginateInterface<HierarchyInterface>>(url);
	}
	getAllHierarchies(query?: Record<string, unknown>) {
		let url = `${environment.apiUrl}/hierarchies`;
		return this.http.get<HierarchyInterface[]>(url);
	}
	createHierarchy(props: HierarchyInterface): Observable<HierarchyInterface> {
		return this.http.post<HierarchyInterface>(`${environment.apiUrl}/hierarchies`, props);
	}
	updateHierarchy(id: string, props: HierarchyInterface): Observable<HierarchyInterface> {
		return this.http.put<HierarchyInterface>(`${environment.apiUrl}/hierarchies/${id}`, props);
	}
	deleteHierarchy(id: string): Observable<HierarchyInterface> {
		return this.http.delete<HierarchyInterface>(`${environment.apiUrl}/hierarchies/${id}`);
	}
}
