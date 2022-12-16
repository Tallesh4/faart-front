import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenGuard } from './token.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenGuard: TokenGuard
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
    if (this.tokenGuard.getToken()) {
      this.tokenGuard.setIsLogged(true);
      return true;
    }

    this.router.navigate(['/login']);
    this.tokenGuard.setIsLogged(false);
    return false;
  }

}
