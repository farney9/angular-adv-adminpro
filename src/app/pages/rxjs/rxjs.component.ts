import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  internalSubs: Subscription;

  constructor() { 

    // this.retornaObservable().pipe(
    //   retry()
    // )
    // .subscribe(
    //   valor => console.log('Subs', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado...')
    // );

    this.internalSubs = this.retornaIntervalo().subscribe( console.log )

  }

  
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe(); //Usar OnDestroy para llamar el unsuscribe() y no permitir que el observable siga emitiendo indefinidamente
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    
    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        /*Para Finalizar un Observable */

        if (i === 4) {
          clearInterval( intervalo );
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llegó al valor de 2');
        }

      }, 1000)

    });

  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      // pipe es un forma de transformar la información que fluye através del Observable
      // ejemplo: cuando a una manguera le conectas un aspersor.
      .pipe(
        // take tomar solo cierta cantidad de valores del intervalo
        take(10),
        // map sirve para transformar la SALIDA de un observable;
        // es decir puedo MUTARLA de la manera que yo necesite
        map( valor => valor + 1), // 0 => 1
        filter(newValor => ( newValor % 2 === 0) ? true: false), // Filter sirve para determinar si quiero emitir un valor o NO de forma condicional
        )

  }



}
