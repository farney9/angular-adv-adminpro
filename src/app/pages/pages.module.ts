import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from '../components/components.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgessBarComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  exports: [
    DashboardComponent,
    ProgessBarComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class PagesModule { }
