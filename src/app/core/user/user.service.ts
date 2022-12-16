import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { UserInterface } from "./user.interface";

@Injectable()
export class UserService {
	constructor(
		private http: HttpClient
	) {}
	getUsers(
			page: number = 1,
			perPage?: number,
			sortBy?: string,
			sort?: string,
			search?: string,
			query?: Record<string, unknown>
		): Observable<PaginateInterface<UserInterface>> {
		let url = `${environment.apiUrl}/users?page=${page}`

		if(perPage) url += "&perPage=" + perPage;
		if(sortBy) url += "&sortBy=" + sortBy;
		if(sort) url += "&sort=" + sort;
		if(search) url += "&search=" + search;
		if(query) {
			for(const key in query) {
				url += `&${key}=${query[key]}`
			}
		}

		return this.http.get<PaginateInterface<UserInterface>>(url);
	}
	getAllUsers(search?: string, query?: Record<string, unknown>) {
		let url = `${environment.apiUrl}/users`;
		return this.http.get<UserInterface[]>(url);
	}
	createUser(props: UserInterface): Observable<UserInterface> {
		return this.http.post<UserInterface>(`${environment.apiUrl}/users`, props);
	}
	updateUser(id: string, props: UserInterface): Observable<UserInterface> {
		return this.http.put<UserInterface>(`${environment.apiUrl}/users/${id}`, props);
	}
	deleteUser(id: string): Observable<UserInterface> {
		return this.http.delete<UserInterface>(`${environment.apiUrl}/users/${id}`);
	}

}
