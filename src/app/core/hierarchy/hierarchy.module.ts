import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { BaseModule } from "src/app/base/base.module";
import { DeleteHierarchyModal } from "./components/delete-hierarchy.modal/delete-hierarchy.modal";
import { HierarchyModal } from "./components/hierarchy.modal/hierarchy.modal";
import { CreateHierarchyGuard } from "./guards/create.hierarchy.guard";
import { DeleteHierarchyGuard } from "./guards/delete.hierarchy.guard";
import { ReadHierarchyGuard } from "./guards/read.hierarchy.guard";
import { UpdateHierarchyGuard } from "./guards/update.hierarchy.guard";
import { HierarchyRoutingModule } from "./hierarchy-routing.module";
import { HierarchyPage } from "./hierarchy.page";
import { HierarchyService } from "./hierarchy.service";

@NgModule({
	declarations: [
		HierarchyPage,
		HierarchyModal,
		DeleteHierarchyModal,
	],
	imports: [
		HierarchyRoutingModule,
		CommonModule,
		NgxPaginationModule,
		BaseModule,
		NgxSkeletonLoaderModule,
		NgbModalModule,
		ReactiveFormsModule,
	],
	providers: [
		ReadHierarchyGuard,
		CreateHierarchyGuard,
		UpdateHierarchyGuard,
		DeleteHierarchyGuard,
		HierarchyService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class HierarchyModule { }
