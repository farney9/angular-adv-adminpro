import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Graphics', url: 'graph1'},
        {title: 'Main', url: '/'},
        {title: 'Progress bar', url: 'progress'},
        {title: 'Promesas', url: 'promesas'},
        {title: 'RxJs', url: 'rxjs'}
      ]
    }
  ];

constructor() { }

}
