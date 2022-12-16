import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { RenewPasswordRoutingModule } from "./renew-password-routing.module";
import { RenewPasswordPage } from "./renew-password.page";
import { RenewPasswordService } from "./renew-password.service";

@NgModule({
  declarations: [RenewPasswordPage],
  imports: [
    RenewPasswordRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BaseModule
  ],
  exports: [RenewPasswordPage],
  providers: [RenewPasswordService]
})
export class RenewPasswordModule { }
