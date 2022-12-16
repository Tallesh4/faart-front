import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResponsiblePage } from "./responsible.page";

const routes: Routes = [
  {path: "", component: ResponsiblePage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleRoutingModule { }
