import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuario => {
      console.log(usuario);
    });    

    // const promesa = new Promise( (resolve, reject) => {

    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });

    // promesa
    //   .then( (mensaje) => {
    //     console.log(mensaje);
    //   })
    //   .catch( error => console.log('Error en mi promesa - ', error));

    // console.log('Fin init');
    
  }

    /* Funciones que retornan promesas */

    getUsuarios() {

       /*Primer forma de hacerlo */ 

      // fetch('https://reqres.in/api/users')
      //   .then( resp => {
      //     resp.json().then( body => console.log(body))
      //   });

      /**Segunda forma de hacerlo */
      return new Promise( resolve => {
        
        fetch('https://reqres.in/api/users')
          .then( resp => resp.json() )
          .then( body => resolve( body.data) );  
      })
    }

}
