import { Component, OnInit } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import { GlobalService } from '../../../services/globalService';
import { Veterinario, Cliente, Contacto } from '../../../app.dataModels';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  clienteDisplay: Cliente;
  contacto: Contacto;

  constructor(
    private globalService: GlobalService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.clienteDisplay = JSON.parse(this.cookieService.get('clienteDisplay'));
    this.getContacto();
  }

  cerrarVentana() {
    let window = remote.getCurrentWindow();
    ipcRenderer.send('request-update-in-window', null);
    window.close();
  }

  
  getContacto() {
    this.contacto = null;
    if (this.clienteDisplay) {
      if (this.clienteDisplay._id != "0") {
        if (this.clienteDisplay.contactos) {
          let moviles = this.clienteDisplay.contactos.filter(contacto => contacto.tipo == 'movil');
          if (moviles.length > 0) {
            this.contacto = moviles[0];
          } else {
            let resto = this.clienteDisplay.contactos.filter(contacto => contacto.tipo != 'movil');
            if (resto.length > 0) {
              this.contacto = resto[0];
            }
          }
        }
      }
    }
  }
}
