import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { SearchesService } from '../../../services/searches.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: UserModel[] = [];
  usersTemp: UserModel[] = [];
  actualPage: number = 0;
  isLoading: boolean = true;

  constructor( private userService: UserService,
               private searchesService: SearchesService ) { }

  ngOnInit(): void {
    this.updateUsersList();
  }

  updateUsersList() {
    this.isLoading = true;
    this.userService.uploadUsers(this.actualPage)
      .subscribe(
        {
          next: ({ total, usuario }) => {
            this.totalUsers = total;
            if (usuario.length !== 0) {
              this.users = usuario;
              this.usersTemp = usuario;
              this.isLoading = false;
            }
          }
        }
      )
  }
  changePage(value: number) {
    this.actualPage += value;

    if (this.actualPage < 0) {
      this.actualPage = 0
    } else if (this.actualPage >= this.totalUsers) {
      this.actualPage -= value;
    }
    this.updateUsersList();
  }

  searchByTerm( term: string) {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.searchesService.search('usuario', term)
      .subscribe({
        next: (response) => {
          this.users = response

        }
      })
  }

}
