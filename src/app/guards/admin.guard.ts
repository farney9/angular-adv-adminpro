import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router) {

  }
  canActivate(): boolean {
    if (this.userService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      this.router.navigateByUrl('/dashboard');
      // this.userService.logOut();
      return false;
    }
  }



}
