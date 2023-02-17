import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: [
  ]
})
export class SiderbarComponent implements OnInit {

  menuItems: any[];
  user: UserModel;


  constructor( private sidebarService: SidebarService,
               private userService: UserService) {
    this.menuItems = sidebarService.menu;
    this.user = userService.user;

    // console.log(this.menuItems);

  }

  ngOnInit(): void {
  }

}
