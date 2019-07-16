import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';

@Component({
  selector: 'app-lista-desparasitaciones',
  templateUrl: './lista-desparasitaciones.component.html',
  styleUrls: ['./lista-desparasitaciones.component.scss']
})
export class ListaDesparasitacionesComponent implements OnInit {

  @Input() mascota: Mascota;
  constructor() { }

  ngOnInit() {
  }

}
