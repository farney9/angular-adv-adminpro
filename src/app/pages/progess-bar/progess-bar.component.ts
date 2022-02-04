import { Component, } from '@angular/core';

@Component({
  selector: 'app-progess-bar',
  templateUrl: './progess-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgessBarComponent {
  progreso1: number = 25;
  progreso2: number = 35;

  get getProgreso1(){
    return `${this.progreso1}%`;
  }
  get getProgreso2(){
    return `${this.progreso2}%`;
  }
  // otra forma de recibir el valorSalida del componente hijo y ponerlo en las propiedades del HTML del padre
  // (valorSalida)="cambioValorHijo($event)"
/*
  cambioValorHijo(valor: number){
    this.progreso1 = valor
  }
  */
}
