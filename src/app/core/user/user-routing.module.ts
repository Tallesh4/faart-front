import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReadUserGuard } from "./guards/read.user.guard";
import { UserPage } from "./user.page";

const routes: Routes = [
	{path: "", component: UserPage, canActivate: [ReadUserGuard]}
]

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }
