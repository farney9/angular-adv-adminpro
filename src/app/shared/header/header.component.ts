import { Component } from '@angular/core';
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


  constructor(public userService: UserService) {
    this.user = userService.user;

   }

  logOut() {
    this.userService.logOut();

  }

}
