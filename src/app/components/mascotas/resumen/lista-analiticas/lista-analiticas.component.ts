import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';
import { CabeceraTabla } from '../../../../models/tablas';

@Component({
  selector: 'app-lista-analiticas',
  templateUrl: './lista-analiticas.component.html',
  styleUrls: ['./lista-analiticas.component.scss']
})
export class ListaAnaliticasComponent implements OnInit {

  headElements: CabeceraTabla[] = [];
  @Input() mascota: Mascota;
  constructor() { }

  ngOnInit() {
    this.inicializaCabecera();
  }


  inicializaCabecera() {
    let entrada1: CabeceraTabla = new CabeceraTabla();
    let entrada2: CabeceraTabla = new CabeceraTabla();
    let entrada3: CabeceraTabla = new CabeceraTabla();
    let entrada4: CabeceraTabla = new CabeceraTabla();
    entrada1.nombre = 'Nombre';
    entrada1.clase = 'cabeceraNombre';
    this.headElements.push(entrada1);
    entrada2.nombre = 'Fecha';
    entrada2.clase = 'cabeceraFecha';
    this.headElements.push(entrada2);
    entrada3.nombre = 'Resultado';
    entrada3.clase = 'cabeceraResultado';
    this.headElements.push(entrada3);
    entrada4.nombre = 'Ver';
    entrada4.clase = 'cabeceraVisualizar';
    this.headElements.push(entrada4);
  }
}
