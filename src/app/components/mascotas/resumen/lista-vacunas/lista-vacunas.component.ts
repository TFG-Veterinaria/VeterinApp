import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';

@Component({
  selector: 'app-lista-vacunas',
  templateUrl: './lista-vacunas.component.html',
  styleUrls: ['./lista-vacunas.component.scss']
})
export class ListaVacunasComponent implements OnInit {

  @Input() mascota: Mascota;
  constructor() { }

  ngOnInit() {
  }

}
