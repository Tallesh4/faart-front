import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { AppInterceptor } from "src/app/app.interceptor";
import { AppModule } from "src/app/app.module";
import { BaseModule } from "src/app/base/base.module";
import { DeletePermissionModal } from "./components/delete-permission.modal/delete-permission.modal";
import { PermissionModal } from "./components/permission.modal/permission.modal";
import { CreatePermissionGuard } from "./guards/create.permission.guard";
import { DeletePermissionGuard } from "./guards/delete.permission.guard";
import { ReadPermissionGuard } from "./guards/read.permission.guard";
import { UpdatePermissionGuard } from "./guards/update.permission.guard";
import { PermissionRoutingModule } from "./permission-routing.module";
import { PermissionPage } from "./permission.page";
import { PermissionService } from "./permission.service";

@NgModule({
	declarations: [
		PermissionPage,
		PermissionModal,
		DeletePermissionModal,
	],
	imports: [
		PermissionRoutingModule,
		CommonModule,
		NgxPaginationModule,
		BaseModule,
		NgxSkeletonLoaderModule,
		NgbModalModule,
		ReactiveFormsModule,
	],
	providers: [
		ReadPermissionGuard,
		CreatePermissionGuard,
		UpdatePermissionGuard,
		DeletePermissionGuard,
		PermissionService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class PermissionModule { }
