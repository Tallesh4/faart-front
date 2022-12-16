import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductPage } from "./product.page";
import { ProductService } from "./product.service";
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { RemoveProductComponent } from './components/remove-product/remove-product.component';
import { ReadProductGuard } from "./guards/read.product.guard";
import { CreateProductGuard } from "./guards/create.product.guard";
import { UpdateProductGuard } from "./guards/update.product.guard";
import { DeleteProductGuard } from "./guards/delete.product.guard";

@NgModule({
  declarations: [ProductPage, CreateUpdateProductComponent, RemoveProductComponent],
  imports: [
    ProductRoutingModule,
    BaseModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [ProductPage],
  providers: [
    ProductService,
    ReadProductGuard,
    CreateProductGuard,
    UpdateProductGuard,
    DeleteProductGuard
  ]
})
export class ProductModule { }
