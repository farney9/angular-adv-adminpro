import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: UserModel[] = [];
  actualPage: number = 0;

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.updateUsersList();
  }

  updateUsersList () {
    this.userService.uploadUsers(this.actualPage)
    .subscribe(
      {
        next: ({total, usuario}) => {
          this.totalUsers = total;
          if (usuario.length !== 0) {
            this.users = usuario
          }
        }
      }
    )
  }
  changePage( value: number) {
    this.actualPage += value;

    if (this.actualPage < 0) {
      this.actualPage = 0
    } else if (this.actualPage >= this.totalUsers) {
      this.actualPage -= value;
    }
    this.updateUsersList();
  }

}
