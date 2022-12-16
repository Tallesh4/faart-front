import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssociationPage } from "./association.page";

const routes: Routes = [
  {path: "", component: AssociationPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
