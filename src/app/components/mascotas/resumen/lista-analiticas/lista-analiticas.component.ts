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
  tieneAnaliticas: boolean = false;
  
  constructor() { }

  ngOnInit() {
    this.compruebaAnaliticas();
    this.inicializaCabecera();
    this.ordenaElementos();
  }

  compruebaAnaliticas(){
    if(this.mascota.analiticas){
      if(this.mascota.analiticas.length>0){
        this.tieneAnaliticas = true;
      }
    }
  }

  inicializaCabecera() {
    let entrada1: CabeceraTabla = new CabeceraTabla();
    let entrada2: CabeceraTabla = new CabeceraTabla();
    let entrada3: CabeceraTabla = new CabeceraTabla();
    let entrada4: CabeceraTabla = new CabeceraTabla();
    // let entrada5: CabeceraTabla = new CabeceraTabla();
    entrada1.nombre = 'Nombre';
    entrada1.clase = 'cabeceraNombre';
    this.headElements.push(entrada1);
    entrada2.nombre = 'Fecha';
    entrada2.clase = 'cabeceraFecha';
    this.headElements.push(entrada2);
    entrada3.nombre = 'Descripcion';
    entrada3.clase = 'cabeceraDescripcion';
    this.headElements.push(entrada3);
    entrada4.nombre = 'Resultado';
    entrada4.clase = 'cabeceraResultado';
    this.headElements.push(entrada4);
    // entrada5.nombre = 'Ver';
    // entrada5.clase = 'cabeceraVisualizar';
    // this.headElements.push(entrada5);
  }

  ordenaElementos(){
    if(this.tieneAnaliticas){
      this.mascota.analiticas.sort((a, b): number => {
        if (a.fecha > b.fecha) return -1;
        if (a.fecha < b.fecha) return 1;
        return 0;
      });
    }
  }
}
