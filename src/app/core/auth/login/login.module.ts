import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginPage } from "./login.page";

@NgModule({
	declarations: [
		LoginPage
	],
	imports: [
		LoginRoutingModule,
		ReactiveFormsModule,
		CommonModule,
		BaseModule,
	],
	exports: [LoginPage]
})
export class LoginModule { }
