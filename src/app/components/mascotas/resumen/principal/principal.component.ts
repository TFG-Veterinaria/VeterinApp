import { Component, OnInit, Input } from '@angular/core';
import { Mascota, Cliente } from '../../../../app.dataModels';
import { OperacionResumenMascota, CabeceraTabla } from '../../../../models/tablas';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  headElements: CabeceraTabla[] = [];
  @Input() mascota: Mascota;
  @Input() cliente: Cliente;
  @Input() elements: OperacionResumenMascota[];
  
  constructor() { }

  ngOnInit() {
    this.inicializaCabecera();
  }


  inicializaCabecera() {
    let entrada1: CabeceraTabla = new CabeceraTabla();
    let entrada2: CabeceraTabla = new CabeceraTabla();
    let entrada3: CabeceraTabla = new CabeceraTabla();
    let entrada4: CabeceraTabla = new CabeceraTabla();
    entrada1.nombre = 'Fecha';
    entrada1.clase = 'cabeceraFecha';
    this.headElements.push(entrada1);
    entrada2.nombre = 'Tipo';
    entrada2.clase = 'cabeceraTipo';
    this.headElements.push(entrada2);
    entrada3.nombre = 'Concepto o descripción';
    entrada3.clase = 'cabeceraDescripcion';
    this.headElements.push(entrada3);
    entrada4.nombre = 'Ver';
    entrada4.clase = 'cabeceraVisualizar';
    this.headElements.push(entrada4);
  }
}
