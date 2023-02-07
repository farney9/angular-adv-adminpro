import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private userService: UserService,
               private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // console.log('Pasó por el canActivate');
    return this.userService.validateToken()
      .pipe(
        tap(isAuthenticated => { // tap me permite disparar un efecto secundario
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      )
  }

}
