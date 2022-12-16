import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { MeService } from "../../me/me.service";

@Injectable()
export class ReadRegistrationFormGuard implements CanActivate{
    constructor(
        private meService: MeService
    ) {}

    canActivate(): Observable<boolean>{
        return this.meService.checkPermission("readRegistrationForm");
    }
}