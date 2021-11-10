import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: [
  ]
})
export class SiderbarComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarService: SidebarService) { 
    this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);
    
  }

  ngOnInit(): void {
  }

}
