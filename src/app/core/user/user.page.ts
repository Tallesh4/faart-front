import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { CreateUserGuard } from "./guards/create.user.guard";
import { DeleteUserGuard } from "./guards/delete.user.guard";
import { UpdateUserGuard } from "./guards/update.user.guard";
import { UserInterface } from "./user.interface";
import { UserService } from "./user.service";

@Component({
	selector: "app-user",
	templateUrl: "./user.page.html",
	styleUrls: [
		"./user.page.scss",
	]
})
export class UserPage implements PaginateInterface<UserInterface>, OnInit {

	fastNavigationData = [
		{
			path: '/home',
			name: 'Home',
		},
		{
			path: '/ferramentas',
			name: 'Ferramentas',
		},
		{
			path: '/ferramentas/usuarios',
			name: 'Usuários',
		}
	];

	page: number = 1;
	perPage: number = 10;
	countPage: number = 1;
	sortBy: string = "createdAt";
	sort: string = "desc";
	total: number = 10;
	items: UserInterface[] = [];

	search: string = "";
	query: Record<string, string> = {};

	headers = [
		{key: 'name', value: 'Nome'},
		{key: 'username', value: 'Nome de usuário'},
		{key: 'email', value: 'Email'},
		{key: 'phoneModel', value: 'Modelo de celular'},
		{key: 'appVersion.version', value: 'Versão do aplicativo'},
	]

	loading = true;
	showCreateUser = false;
	showUpdateUser = false;
	showDeleteUser = false;
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private createUserGuard: CreateUserGuard,
		private updateUserGuard: UpdateUserGuard,
		private deleteUserGuard: DeleteUserGuard
	) { }
	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(queryParams => {
			this.page = queryParams["page"] ?? this.page;
			this.perPage = queryParams["perPage"] ?? this.perPage;
			this.sortBy = queryParams["sortBy"] ?? this.sortBy;
			this.sort = queryParams["sort"] ?? this.sort;

			this.search = queryParams["search"] ?? this.search;

			this.getUsers();
		});
		this.createUserGuard.canActivate().subscribe(isAllowed => {
			this.showCreateUser = isAllowed;
		})
		this.updateUserGuard.canActivate().subscribe(isAllowed => {
			this.showUpdateUser = isAllowed;
		})
		this.deleteUserGuard.canActivate().subscribe(isAllowed => {
			this.showDeleteUser = isAllowed;
		})
	}
	getUsers() {
		this.loading = true;

		this.userService.getAllUsers().subscribe(paginate => {
			this.items = paginate;
			this.total = paginate.length;
			this.loading = false;
		});
	}

	changeSort(header: {key: string, value: string}) {
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				sortBy: header.key,
				sort: this.sortBy == header.key ? (this.sort == "asc" ? "desc" : "asc") : this.sort
			},
			queryParamsHandling: "merge"
		})
	}
	changePage(page: number) {
		this.page = page;
	}
	changeSearch({ search }: {search: string}) {
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				search: search
			},
			queryParamsHandling: "merge"
		});
	}
	changePerPage(target: EventTarget | null) {
		if(target) {
			const input = (target as HTMLSelectElement).value;
			this.router.navigate([], {
				relativeTo: this.activatedRoute,
				queryParams: {
					perPage: input
				},
				queryParamsHandling: "merge"
			});

		}
	}

	getLoadLines() {
		return new Array(this.perPage);
	}
}
