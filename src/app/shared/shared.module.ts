import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SiderbarComponent } from './sidebar/siderbar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SiderbarComponent,
    HeaderComponent,

  ],
  exports: [
    BreadcrumbsComponent,
    SiderbarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
