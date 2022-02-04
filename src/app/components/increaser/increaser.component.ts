import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent implements OnInit {
  // 'valor' es el nombre con el cual quiero renombar  el argumento que se envía desde el componente padre
  @Input('valor') progress: number = 40;
  @Input() btnClass: string = 'btn-info';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
  this.btnClass = `btn ${this.btnClass}`    
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value >=0) {
      this.valorSalida.emit(100);
      return this.progress = 100;
    }
        
    if (this.progress <= 0 && value < 0) {
      this.valorSalida.emit(0);
     
      return this.progress = 0
    }
    this.progress += value;
    this.valorSalida.emit(this.progress);
  }

  onChange(nuevoValor: number){
    if (nuevoValor >= 100) {
      this.progress = 100;
    } else if (nuevoValor <= 0) {
      this.progress = 0;
    } else {
      this.progress = nuevoValor;
    }

    this.valorSalida.emit( this.progress );
    
  }
}
