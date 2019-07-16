import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../../../../app.dataModels';

@Component({
  selector: 'app-lista-tratamientos',
  templateUrl: './lista-tratamientos.component.html',
  styleUrls: ['./lista-tratamientos.component.scss']
})
export class ListaTratamientosComponent implements OnInit {

  @Input() mascota: Mascota;
  constructor() { }

  ngOnInit() {
  }

}
