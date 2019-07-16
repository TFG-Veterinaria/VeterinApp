import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';
import { CabeceraTabla } from '../../../../models/tablas';

@Component({
  selector: 'app-lista-tratamientos',
  templateUrl: './lista-tratamientos.component.html',
  styleUrls: ['./lista-tratamientos.component.scss']
})
export class ListaTratamientosComponent implements OnInit {


  headElements: CabeceraTabla[] = [];
  @Input() mascota: Mascota;
  tieneTratamientos: boolean = false;

  constructor() { }

  ngOnInit() {
    this.compruebaTratamientos();
    this.inicializaCabecera();
    this.ordenaElementos();
  }

  compruebaTratamientos() {
    if (this.mascota.tratamientos) {
      if (this.mascota.tratamientos.length > 0) {
        this.tieneTratamientos = true;
      }
    }
  }

  inicializaCabecera() {
    let entrada1: CabeceraTabla = new CabeceraTabla();
    let entrada2: CabeceraTabla = new CabeceraTabla();
    let entrada3: CabeceraTabla = new CabeceraTabla();
    let entrada4: CabeceraTabla = new CabeceraTabla();
    // let entrada5: CabeceraTabla = new CabeceraTabla();
    entrada1.nombre = 'Fecha';
    entrada1.clase = 'cabeceraFecha';
    this.headElements.push(entrada1);
    entrada2.nombre = 'Tipo de tratamiento';
    entrada2.clase = 'cabeceraTipo';
    this.headElements.push(entrada2);
    entrada3.nombre = 'Anamnesis';
    entrada3.clase = 'cabeceraAnamnesis';
    this.headElements.push(entrada3);
    entrada4.nombre = 'Diagnóstico';
    entrada4.clase = 'cabeceraDiagnostico';
    this.headElements.push(entrada4);
    // entrada5.nombre = 'Ver';
    // entrada5.clase = 'cabeceraVisualizar';
    // this.headElements.push(entrada5);
  }

  ordenaElementos() {
    if (this.tieneTratamientos) {
      this.mascota.tratamientos.sort((a, b): number => {
        if (a.fecha > b.fecha) return -1;
        if (a.fecha < b.fecha) return 1;
        return 0;
      });
    }
  }
}
