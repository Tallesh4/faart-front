import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { MeService } from "src/app/core/me/me.service";
import { UserService } from "../user.service";

@Injectable()
export class CreateUserGuard implements CanActivate {
	constructor(
		private meService: MeService
	) { }
	canActivate(): Observable<boolean> {
		return this.meService.checkPermission("createUsers");
	}
}
