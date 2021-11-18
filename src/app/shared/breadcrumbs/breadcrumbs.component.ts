import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent  {

  titulo: string;

  constructor( private router: Router) {
    
    this.getRouteArguments();
  }

  getRouteArguments() {
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data ),
    )
    .subscribe( ({title}) => { //usando l a desestructuracion del objeto que viene en data y accediendo a la propiedad title
      // console.log( data );
      this.titulo = title;
      document.title = `AdminPro - ${title}`;
  });
  }

}
