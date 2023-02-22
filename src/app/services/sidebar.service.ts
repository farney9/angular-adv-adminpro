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
    },
    {
      title: 'Management',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Users', url: 'users'},
        {title: 'Hospitals', url: 'hospitals'},
        {title: 'Doctors', url: 'doctors'}
      ]
    }
  ];

constructor() { }

}
