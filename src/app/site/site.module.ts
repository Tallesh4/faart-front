import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { SiteRoutingModule } from "./site-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeSiteService } from "./home/home-site.service";
import { RegisterComponent } from "./register/register.component";
import { RegisterSiteService } from "./register/register.service";
import { AddressService } from "../core/address/address.service";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [HomeComponent, RegisterComponent],
  imports: [
    SiteRoutingModule,
    BaseModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [HomeComponent],
  providers: [HomeSiteService, RegisterSiteService, AddressService]
})
export class SiteModule { }
