import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMaskModule } from "ngx-mask";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { BaseModule } from "src/app/base/base.module";
import { DeleteUserModal } from "./components/delete-user.modal/delete-user.modal";
import { UserModal } from "./components/user.modal/user.modal";
import { CreateUserGuard } from "./guards/create.user.guard";
import { DeleteUserGuard } from "./guards/delete.user.guard";
import { ReadUserGuard } from "./guards/read.user.guard";
import { UpdateUserGuard } from "./guards/update.user.guard";
import { UserRoutingModule } from "./user-routing.module";
import { UserPage } from "./user.page";
import { UserService } from "./user.service";

@NgModule({
	declarations: [
		UserPage,
		UserModal,
		DeleteUserModal,
	],
	imports: [
		UserRoutingModule,
		CommonModule,
		NgxPaginationModule,
		BaseModule,
		NgxSkeletonLoaderModule,
		NgbModalModule,
		ReactiveFormsModule,
		NgxMaskModule.forRoot()
	],
	providers: [
		ReadUserGuard,
		CreateUserGuard,
		UpdateUserGuard,
		DeleteUserGuard,
		UserService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class UserModule { }
