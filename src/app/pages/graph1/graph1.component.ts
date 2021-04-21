import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component {


  public labels1: string[] = ['Verduras', 'Frutas', 'Granos'];

  public data1 = [
    [40, 30, 20],
  ];
}
