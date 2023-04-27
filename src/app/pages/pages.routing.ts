import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guards
import { AuthGuard } from '../guards/auth.guard';

//Components
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard], // CanActivate: permite especificar cuál ruta se puede activar
        canLoad: [AuthGuard], // Canload: permite especificar cuál ruta se puede cargar antes de intentar hacer otra cosa
        // Implementación de LazyLoad (Carga perezosa)
        loadChildren: () => import('./child-routes.module').then(module => module.ChildRoutesModule)
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
