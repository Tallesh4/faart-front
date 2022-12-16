import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { CreatePermissionGuard } from "./guards/create.permission.guard";
import { DeletePermissionGuard } from "./guards/delete.permission.guard";
import { UpdatePermissionGuard } from "./guards/update.permission.guard";
import { PermissionInterface } from "./permission.interface";
import { PermissionService } from "./permission.service";

@Component({
	selector: "app-permission",
	templateUrl: "./permission.page.html",
	styleUrls: [
		"./permission.page.scss",
	]
})
export class PermissionPage implements PaginateInterface<PermissionInterface>, OnInit {

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
			path: '/ferramentas/permissoes',
			name: 'Permissões',
		}
	];

	page: number = 1;
	perPage: number = 10;
	countPage: number = 1;
	sortBy: string = "createdAt";
	sort: string = "desc";
	total: number = 10;
	items: PermissionInterface[] = [];
	selectedItems: string[] = [];

	search: string = "";
	query: Record<string, unknown> = {
		enabled: true
	};

	headers = [
		{key: 'tag', value: 'Etiqueta'},
		{key: 'collectionName', value: 'Nome da coleção'},
		{key: 'type', value: 'Tipo'},
		{key: 'name', value: 'Nome'},
		{key: 'description', value: 'Descrição'},
	]

	loading = true;
	showCreatePermission = false;
	showUpdatePermission = false;
	showDeletePermission = false;
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private permissionService: PermissionService,
		private createPermissionGuard: CreatePermissionGuard,
		private updatePermissionGuard: UpdatePermissionGuard,
		private deletePermissionGuard: DeletePermissionGuard
	) { }
	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(queryParams => {
			this.page = queryParams["page"] ?? this.page;
			this.perPage = queryParams["perPage"] ?? this.perPage;
			this.sortBy = queryParams["sortBy"] ?? this.sortBy;
			this.sort = queryParams["sort"] ?? this.sort;

			this.search = queryParams["search"] ?? this.search;

			this.getPermissions();
		});
		this.createPermissionGuard.canActivate().subscribe(isAllowed => {
			this.showCreatePermission = isAllowed;
		})
		this.updatePermissionGuard.canActivate().subscribe(isAllowed => {
			this.showUpdatePermission = isAllowed;
		})
		this.deletePermissionGuard.canActivate().subscribe(isAllowed => {
			this.showDeletePermission = isAllowed;
		})
	}
	getPermissions() {
		this.permissionService.getPermissions(
			this.page,
			this.perPage,
			this.sortBy,
			this.sort,
			this.search,
			this.query
		).subscribe(paginate => {
			this.page = paginate.page;
			this.perPage = paginate.perPage;
			this.countPage = paginate.countPage;
			this.sortBy = paginate.sortBy;
			this.sort = paginate.sort;
			this.total = paginate.total;
			this.items = paginate.items.map(item => {
				item.createdAt = item.createdAt ? new Date(item.createdAt) : item.createdAt;
				item.updatedAt = item.updatedAt ? new Date(item.updatedAt) : item.updatedAt;
				return item;
			});

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
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				page: page
			},
			queryParamsHandling: 'merge'
		});
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
	toggleSelectItem(event: Event, item: PermissionInterface) {
		const checkbox: HTMLInputElement = <HTMLInputElement>event.target;

		if(checkbox.checked) {
			if(item.id) {
				this.selectedItems.push(item.id);
			}
		} else {
			if(item.id) {
				const index = this.selectedItems.indexOf(item.id);
				this.selectedItems.splice(index, 1);
			}
		}
	}
	archiveItems() {
		if(this.selectedItems.length) {
			this.loading = true;
			this.permissionService.archivePermissions(this.selectedItems).subscribe(() => {
				this.selectedItems = [];
				this.getPermissions();
			});
		}
	}
	restoreItems() {
		if(this.selectedItems.length) {
			this.loading = true;
			this.permissionService.archivePermissions(this.selectedItems, true).subscribe(() => {
				this.selectedItems = [];
				this.getPermissions();
			});
		}
	}

	toggleArchived() {
		this.query.enabled = !this.query.enabled;
		this.loading = true;
		this.selectedItems = [];
		this.getPermissions();
	}
	getLoadLines() {
		return new Array(this.perPage);
	}
}
