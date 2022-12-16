import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReadProductGuard } from "./guards/read.product.guard";
import { ProductPage } from "./product.page";

const routes: Routes = [
  {path: "", component: ProductPage, canActivate: [ReadProductGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
