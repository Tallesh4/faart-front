import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReadHierarchyGuard } from "./guards/read.hierarchy.guard";
import { HierarchyPage } from "./hierarchy.page";

const routes: Routes = [
	{path: "", component: HierarchyPage, canActivate: [ReadHierarchyGuard]}
]

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class HierarchyRoutingModule { }
