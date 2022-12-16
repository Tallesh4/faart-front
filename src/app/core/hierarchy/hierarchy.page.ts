import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { CreateHierarchyGuard } from "./guards/create.hierarchy.guard";
import { DeleteHierarchyGuard } from "./guards/delete.hierarchy.guard";
import { UpdateHierarchyGuard } from "./guards/update.hierarchy.guard";
import { HierarchyInterface } from "./hierarchy.interface";
import { HierarchyService } from "./hierarchy.service";

@Component({
	selector: "app-hierarchy",
	templateUrl: "./hierarchy.page.html",
	styleUrls: [
		"./hierarchy.page.scss",
	]
})
export class HierarchyPage implements PaginateInterface<HierarchyInterface>, OnInit {

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
			path: '/ferramentas/hierarquias',
			name: 'Hierarquias',
		}
	];

	page: number = 1;
	perPage: number = 10;
	countPage: number = 1;
	sortBy: string = "createdAt";
	sort: string = "desc";
	total: number = 10;
	items: HierarchyInterface[] = [];

	search: string = "";
	query: Record<string, string> = {};

	headers = [
		{key: 'tag', value: 'Etiqueta'},
		{key: 'name', value: 'Nome'},
		{key: 'level', value: 'Nível'},
		{key: 'createdAt', value: "Criado em"},
		{key: 'updatedAt', value: "Atualizado em"},
	]

	loading = true;
	showCreateHierarchy = false;
	showUpdateHierarchy = false;
	showDeleteHierarchy = false;
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private hierarchyService: HierarchyService,
		private createHierarchyGuard: CreateHierarchyGuard,
		private updateHierarchyGuard: UpdateHierarchyGuard,
		private deleteHierarchyGuard: DeleteHierarchyGuard
	) { }
	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(queryParams => {
			this.page = queryParams["page"] ?? this.page;
			this.perPage = queryParams["perPage"] ?? this.perPage;
			this.sortBy = queryParams["sortBy"] ?? this.sortBy;
			this.sort = queryParams["sort"] ?? this.sort;

			this.search = queryParams["search"] ?? this.search;

			this.getHierarchies();
		});
		this.createHierarchyGuard.canActivate().subscribe(isAllowed => {
			this.showCreateHierarchy = isAllowed;
		})
		this.updateHierarchyGuard.canActivate().subscribe(isAllowed => {
			this.showUpdateHierarchy = isAllowed;
		})
		this.deleteHierarchyGuard.canActivate().subscribe(isAllowed => {
			this.showDeleteHierarchy = isAllowed;
		})
	}
	getHierarchies() {
		this.hierarchyService.getHierarchies(
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

	getLoadLines() {
		return new Array(this.perPage);
	}
}
