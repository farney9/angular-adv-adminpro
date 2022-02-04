import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent, data: { title: 'Dashboard'}},
          { path: 'progress', component: ProgessBarComponent, data: { title: 'Progess Bar'}},
          { path: 'graph1', component: Graph1Component, data: { title: 'Graph #1'}},
          { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings'}},
          { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'}}
        //   {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
