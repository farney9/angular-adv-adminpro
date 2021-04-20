import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PagesRoutingModule } from './pages/pages.routing';

import { NotfoundComponent } from './notfound/notfound.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  {path: '**', component: NotfoundComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
