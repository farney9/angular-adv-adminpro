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
          { path: '', component: DashboardComponent},
          { path: 'progress', component: ProgessBarComponent},
          { path: 'graph1', component: Graph1Component},
          { path: 'account-settings', component: AccountSettingsComponent},
          { path: 'promesas', component: PromesasComponent},
          { path: 'rxjs', component: RxjsComponent}
        //   {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
