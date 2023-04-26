import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  user: UserModel;


  constructor( private userService: UserService,
               private router: Router) {
    this.user = userService.user;

   }

  logOut() {
    this.userService.logOut();
  }

  searchAll(term: string) {
    console.log(term);
    if ( term.length === 0 ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/search/${term}`);

  }

}
