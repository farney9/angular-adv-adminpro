import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { 

    this.retornaObservable().pipe(
      retry()
    )
    .subscribe(
      valor => console.log('Subs', valor),
      error => console.warn('Error', error),
      () => console.info('Obs terminado...')
    );

  }

  retornaObservable(): Observable<number> {
    let i = -1;
    
    return new Observable<number>( observer => {
      
      const intervalo = setInterval( () => {
        // console.log('tick');
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

  ngOnInit(): void {

  }

}
