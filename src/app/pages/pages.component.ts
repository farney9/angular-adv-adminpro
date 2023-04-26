import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private readonly settingsService: SettingsService,
               private sidebarService: SidebarService) { }

  ngOnInit(): void {
    //  ./assets/css/colors/purple-dark.css
    customInitFunctions();
    this.sidebarService.loadMenu();
    console.log(this.sidebarService.menu);

  }
}
