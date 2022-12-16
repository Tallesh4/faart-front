import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MeService } from "src/app/core/me/me.service";

@Injectable()
export class UpdatePermissionGuard implements CanActivate {
	constructor(
		private meService: MeService
	) { }
	canActivate(): Observable<boolean> {
		return this.meService.checkPermission("updatePermissions");
	}
}
