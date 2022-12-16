import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { MeService } from "src/app/core/me/me.service";
import { HierarchyService } from "../hierarchy.service";

@Injectable()
export class CreateHierarchyGuard implements CanActivate {
	constructor(
		private meService: MeService
	) { }
	canActivate(): Observable<boolean> {
		return this.meService.checkPermission("createHierarchies");
	}
}
