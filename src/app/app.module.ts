import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BaseModule } from "./base/base.module";
import { IndexModule } from "./core/index/index.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PermissionModule } from "./core/permission/permission.module";
import { VerifyModule } from "./core/auth/verify/verify.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductModule } from "./core/product/product.module";
import { AuthComponent } from './core/auth/auth.component';
import { LoginModule } from "./core/auth/login/login.module";
import { HierarchyModule } from "./core/hierarchy/hierarchy.module";
import { UserModule } from "./core/user/user.module";
import { HomeComponent } from "./site/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { SiteModule } from "./site/site.module";
// import { LOCALE_ID } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
// import localePt from '@angular/common/locales/pt';

// registerLocaleData(localePt, 'pt');
@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		IndexModule,
		BaseModule,
		HttpClientModule,
		BrowserAnimationsModule,
		PermissionModule,
		LoginModule,
		VerifyModule,
		HierarchyModule,
		NgbModule,
		UserModule,
		SiteModule,
		ProductModule,
	],
	exports: [
		AppRoutingModule,
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		// {
		// 	provide: LOCALE_ID,
		// 	useValue: "pt-BR"
		// }
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
