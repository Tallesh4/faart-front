import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReadPermissionGuard } from "./guards/read.permission.guard";
import { PermissionPage } from "./permission.page";

const routes: Routes = [
	{path: "", component: PermissionPage, canActivate: [ReadPermissionGuard]}
]

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class PermissionRoutingModule { }
