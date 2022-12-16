import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexPage } from "./index.page";

const routes: Routes = [
	{path: "", component: IndexPage},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IndexRoutingModule { }
