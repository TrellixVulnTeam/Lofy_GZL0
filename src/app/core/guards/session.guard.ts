import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //el guardian por defecto da permiso a todos, hay que cambiarlo.
    return this.checkCookieSession();
  }

  checkCookieSession(): boolean {
    //cuando
    try {
      const token: boolean = this.cookieService.check('token') //buscamos si tenemos cookie y la metemos dentro de la variable
      if (!token) {
        //si no tiene cookie, se redirecciona de nuevo al login de inicio
        this.router.navigate(['/', 'auth'])
      }
      return token
    } catch (e) {
      console.log('Ha habido un error', e);
      return false
    }

  }

}
