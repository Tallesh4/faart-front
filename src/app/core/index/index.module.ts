import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { IndexRoutingModule } from "./index-routing.module";
import { IndexPage } from "./index.page";

@NgModule({
	declarations: [
		IndexPage
	],
	imports: [
		IndexRoutingModule,
		BaseModule
	],
	exports: [IndexPage]
})
export class IndexModule { }
