import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';
import { CabeceraTabla } from '../../../../models/tablas';

@Component({
  selector: 'app-lista-vacunas',
  templateUrl: './lista-vacunas.component.html',
  styleUrls: ['./lista-vacunas.component.scss']
})
export class ListaVacunasComponent implements OnInit {


  headElements: CabeceraTabla[] = [];
  @Input() mascota: Mascota;
  tieneVacunas: boolean = false;

  constructor() { }

  ngOnInit() {
    this.compruebaVacunas();
    this.inicializaCabecera();
    this.ordenaElementos();
  }

  compruebaVacunas() {
    if (this.mascota.vacunas) {
      if (this.mascota.vacunas.length > 0) {
        this.tieneVacunas = true;
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
    entrada2.clase = 'cabeceraVacuna';
    this.headElements.push(entrada2);
    // entrada3.nombre = 'Ver';
    // entrada3.clase = 'cabeceraVisualizar';
    // this.headElements.push(entrada3);
  }

  ordenaElementos() {
    if (this.tieneVacunas) {
      this.mascota.vacunas.sort((a, b): number => {
        if (a.fecha > b.fecha) return -1;
        if (a.fecha < b.fecha) return 1;
        return 0;
      });
    }
  }
}
