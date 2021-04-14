import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graph1Component } from './pages/graph1/graph1.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PagesComponent } from './pages/pages.component';
import { ProgessBarComponent } from './pages/progess-bar/progess-bar.component';

const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'progress', component: ProgessBarComponent},
      { path: 'graph1', component: Graph1Component},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  {path: '**', component: NotfoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
