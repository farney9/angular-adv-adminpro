import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './management/users/users.component';
import { HospitalsComponent } from './management/hospitals/hospitals.component';
import { DoctorsComponent } from './management/doctors/doctors.component';
import { DoctorDetailsComponent } from './management/doctor-details/doctor-details.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { AdminGuard } from '../guards/admin.guard';



export const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'}},
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings'}},
  { path: 'graph1', component: Graph1Component, data: { title: 'Graph #1'}},
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile'}},
  { path: 'progress', component: ProgessBarComponent, data: { title: 'Progess Bar'}},
  { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'}},
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'}},
  { path: 'search/:term', component: GlobalSearchComponent, data: { title: 'Searches'}},

  //Managenents
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors management'}},
  { path: 'doctors/:id', component: DoctorDetailsComponent, data: { title: 'Doctor details'}},
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals management'}},

  //Rutas de ADMIN_ROLE
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users management'}},

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
