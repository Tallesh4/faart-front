import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionModule } from "./core/permission/permission.module";
import { ProductModule } from "./core/product/product.module";
import { VerifyModule } from "./core/auth/verify/verify.module";
import { ToastrModule } from "ngx-toastr";
import { HierarchyModule } from "./core/hierarchy/hierarchy.module";
import { UserModule } from "./core/user/user.module";
import { LoginModule } from "./core/auth/login/login.module";
import { AuthComponent } from "./core/auth/auth.component";
import { MainLayoutComponent } from "./base/components/main-layout/main-layout.component";
import { SplashModule } from "./core/splash/splash.module";
import { HomeModule } from "./core/home/home.module";
import { PasswordResetModule } from "./core/auth/password-reset/password-reset.module";
import { RenewPasswordModule } from "./core/auth/renew-password/renew-password.module";
import { MainComponent } from "./main/main.component";
import { AssociationModule } from "./core/association/association.module";
import { ResponsibleModule } from "./core/responsible/responsible.module";
import { HomeComponent } from "./site/home/home.component";
import { SiteModule } from "./site/site.module";
import { RegistrationFormModule } from "./core/registration-form/registration-form.module";

const routes: Routes = [
	{ path: '', redirectTo: 'site', pathMatch: 'full' },
	{
		path: "site",
		loadChildren: () => SiteModule
	},
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: "",
				component: MainComponent
			}
		]
	},
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: "login",
				loadChildren: () => LoginModule
			},
			{
				path: "verificacao/:id",
				loadChildren: () => VerifyModule
			},
			{
				path: "splash",
				loadChildren: () => SplashModule,
				canActivate: []
			},
			{
				path: "resete-senha",
				loadChildren: () => PasswordResetModule,
				canActivate: []
			},
			{
				path: "renovar-senha/:id",
				loadChildren: () => RenewPasswordModule,
				canActivate: []
			}
		]
	},
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{
				path: "ferramentas/permissoes",
				loadChildren: () => PermissionModule,
				canActivate: []
			},
			{
				path: "responsible",
				loadChildren: () => ResponsibleModule,
				canActivate: []
			},
			{
				path: "associations",
				loadChildren: () => AssociationModule,
				canActivate: []
			},
			{
				path: "register-form",
				loadChildren: () => RegistrationFormModule,
				canActivate: []
			},
			{
				path: "settings/products",
				loadChildren: () => ProductModule,
				canActivate: []
			},
			{
				path: "home",
				loadChildren: () => HomeModule,
				canActivate: []
			},
		]
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		HttpClientModule,
		ToastrModule,
	],
	exports: [RouterModule],
})

export class AppRoutingModule { }
