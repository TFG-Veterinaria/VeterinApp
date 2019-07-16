import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';
import { CabeceraTabla } from '../../../../models/tablas';

@Component({
  selector: 'app-lista-desparasitaciones',
  templateUrl: './lista-desparasitaciones.component.html',
  styleUrls: ['./lista-desparasitaciones.component.scss']
})
export class ListaDesparasitacionesComponent implements OnInit {


  headElements: CabeceraTabla[] = [];
  @Input() mascota: Mascota;
  tieneDesparasitaciones: boolean = false;
  
  constructor() { }

  ngOnInit() {
    this.compruebaDesparasitaciones();
    this.inicializaCabecera();
    this.ordenaElementos();
  }

  compruebaDesparasitaciones(){
    if(this.mascota.desparasitaciones){
      if(this.mascota.desparasitaciones.length>0){
        this.tieneDesparasitaciones = true;
      }
    }
  }

  inicializaCabecera() {
    let entrada1: CabeceraTabla = new CabeceraTabla();
    let entrada2: CabeceraTabla = new CabeceraTabla();
    // let entrada3: CabeceraTabla = new CabeceraTabla();
    entrada1.nombre = 'Fecha';
    entrada1.clase = 'cabeceraFecha';
    this.headElements.push(entrada1);
    entrada2.nombre = 'Nombre';
    entrada2.clase = 'cabeceraDesparasitacion';
    this.headElements.push(entrada2);
    // entrada3.nombre = 'Ver';
    // entrada3.clase = 'cabeceraVisualizar';
    // this.headElements.push(entrada3);
  }

  ordenaElementos(){
    if(this.tieneDesparasitaciones){
      this.mascota.desparasitaciones.sort((a, b): number => {
        if (a.fecha > b.fecha) return -1;
        if (a.fecha < b.fecha) return 1;
        return 0;
      });
    }
  }
}
