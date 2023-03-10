import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guards
import { AuthGuard } from '../guards/auth.guard';

//Components
import { PagesComponent } from './pages.component';
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

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { title: 'Dashboard'}},
          { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings'}},
          { path: 'graph1', component: Graph1Component, data: { title: 'Graph #1'}},
          { path: 'profile', component: ProfileComponent, data: { title: 'Profile'}},
          { path: 'progress', component: ProgessBarComponent, data: { title: 'Progess Bar'}},
          { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'}},

          //Managenents
          { path: 'users', component: UsersComponent, data: { title: 'Users management'}},
          { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals management'}},
          { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors management'}},

        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
