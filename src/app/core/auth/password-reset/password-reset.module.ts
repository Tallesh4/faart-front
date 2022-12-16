import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { PasswordResetRoutingModule } from "./password-reset-routing.module";
import { PasswordResetPage } from "./password-reset.page";
import { PasswordResetService } from "./password-reset.service";

@NgModule({
  declarations: [PasswordResetPage],
  imports: [
    PasswordResetRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BaseModule
  ],
  exports: [PasswordResetPage],
  providers: [PasswordResetService]
})
export class PasswordResetModule { }
