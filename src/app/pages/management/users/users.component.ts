import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { UserModel } from '../../../models/user.model';
import { ModalService } from '../../../services/modal.service';
import { SearchesService } from '../../../services/searches.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  totalUsers: number = 0;
  users: UserModel[] = [];
  usersTemp: UserModel[] = [];
  actualPage: number = 0;
  isLoading: boolean = true;
  imageSubscription?: Subscription;

  constructor( private userService: UserService,
               private searchesService: SearchesService,
               public modalService: ModalService) { }

  ngOnInit(): void {
    this.updateUsersList();
    this.imageSubscription =  this.modalService.newImageEvent
      .pipe( delay(100))
      .subscribe( img =>  this.updateUsersList() );
  }
  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
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

  searchByTerm(term: string) {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.searchesService.search('usuario', term)
      .subscribe({
        next: (response: UserModel[]) => {
          this.users = response

        }
      })
  }

  onDelete(user: UserModel) {
    if (user.uid === this.userService.uid) {
      return Swal.fire({
        title: `Don't allowed`,
        html: `<b>You can't delete yourself </b>`,
        icon: 'info'
      })

    }

    Swal.fire({
      title: 'Are you sure?',
      html: `This action will delete the user <b>${user.name}</b>. You won't be able to revert this!`,
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user)
          .subscribe((resp) => {
            Swal.fire(
              'Deleted!',
              `the user <b>${user.name}</b> has been deleted.`,
              'success'
            )
            this.updateUsersList();
          })
      }
    })

  }

  changeRole(user: UserModel) {
    this.userService.updateUser(user)
    .subscribe( resp => {
        console.log(resp);
      })
  }

  openModal(user: UserModel) {
    this.modalService.showModal('usuario', user.uid, user.image);
    // console.log(user);
  }

}
