import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './management/users/users.component';
import { HospitalsComponent } from './management/hospitals/hospitals.component';
import { DoctorsComponent } from './management/doctors/doctors.component';
import { DoctorDetailsComponent } from './management/doctor-details/doctor-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgessBarComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorDetailsComponent,
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
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
