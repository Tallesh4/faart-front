import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { VerifyRoutingModule } from "./verify-routing.module";
import { VerifyPage } from "./verify.page";

@NgModule({
	declarations: [
		VerifyPage
	],
	imports: [
		VerifyRoutingModule,
		ReactiveFormsModule,
		CommonModule,
		BaseModule,
	],
	exports: [VerifyPage]
})
export class VerifyModule { }
