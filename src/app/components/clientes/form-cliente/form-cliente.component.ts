import { Component, OnInit } from '@angular/core';
import { Cliente, Contacto } from '../../../app.dataModels';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../services/globalService';
import { DataManagement } from '../../../services/dataManagement';
import { CabeceraTabla } from '../../../models/tablas';
import { ErroresFormCliente } from '../../../models/errores';
import { CookieService } from 'ngx-cookie-service';

const CONST_COOKIE_CLIENTEEDITADO = 'sesionClienteEditado';
@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  headElements: CabeceraTabla[] = [];

  tema = "_oscuro";
  new: boolean;
  ready = false;
  clienteEditado: Cliente = new Cliente();
  contactos: Contacto[];
  errores: ErroresFormCliente = new ErroresFormCliente();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private dm: DataManagement,
    private cookieService: CookieService
  ) {
    console.log("CONSTRUCTOR");
  }

  ngOnInit() {
    console.log("INIT");
    this.inicializaCabecera();

    this.tema = "_" + this.globalService.getTema();
    this.route.params.forEach(params => {
      if (params && params['id']) {
        this.new = false;
        // Mandatories
        let cli = this.globalService.clientes.find(cliente => cliente._id==params["id"]);
        this.clienteEditado = new Cliente();
        this.clienteEditado.codPostal = cli.codPostal;
        this.clienteEditado.contactos = cli.contactos;
        this.clienteEditado.cuidados = cli.cuidados;
        this.clienteEditado.direccion = cli.direccion;
        this.clienteEditado.dni = cli.dni;
        this.clienteEditado.email = cli.email;
        this.clienteEditado.facturas = cli.facturas;
        this.clienteEditado.fecModificacion = cli.fecModificacion;
        this.clienteEditado.fecNac = cli.fecNac;
        this.clienteEditado.nombre = cli.nombre;
        this.clienteEditado.poblacion = cli.poblacion;
        this.clienteEditado._id = cli._id;
        this.clienteEditado.apellidos = cli.apellidos;

        this.dm.getContactos(this.clienteEditado._id).then((contactos: Contacto[]) => {
          this.clienteEditado.contactos = contactos;
          this.ready = true;
        }).catch((_) => {});
      } else {
          this.new = this.checkCreacionDeContacto();
      }
    });
  }

  checkCreacionDeContacto(): boolean {
    if (this.cookieService.get(CONST_COOKIE_CLIENTEEDITADO)) {
      this.clienteEditado = JSON.parse(this.cookieService.get(CONST_COOKIE_CLIENTEEDITADO));
      this.dm.getContactos(this.clienteEditado._id).then((contactos: Contacto[]) => {
        console.log("PASA");
        this.clienteEditado.contactos = contactos;
        this.cookieService.delete(CONST_COOKIE_CLIENTEEDITADO);
      });
      return false;
    } else {
      return true;
    }
  }

  metodoDesarrollo() {
    //Para desarrollo
    if(!this.clienteEditado){
      this.clienteEditado = new Cliente();
      this.clienteEditado.contactos = [];
    }
  }

  inicializaErrores() {
    this.errores.nombre = '';
    this.errores.apellidos = '';
    this.errores.direccion = '';
    this.errores.poblacion = '';
    this.errores.codPostal = '';
    this.errores.dni = '';
    this.errores.email = '';
    this.errores.fecNac = '';
  }

  inicializaCabecera() {
    let entrada1: CabeceraTabla = new CabeceraTabla();
    let entrada2: CabeceraTabla = new CabeceraTabla();
    let entrada3: CabeceraTabla = new CabeceraTabla();
    let entrada4: CabeceraTabla = new CabeceraTabla();
    entrada1.nombre = 'Nombre';
    entrada1.clase = 'cabeceraNombre';
    this.headElements.push(entrada1);
    entrada2.nombre = 'Telefono';
    entrada2.clase = 'cabeceraTelefono';
    this.headElements.push(entrada2);
    entrada3.nombre = 'Tipo';
    entrada3.clase = 'cabeceraTipo';
    this.headElements.push(entrada3);
    entrada4.nombre = 'Quitar';
    entrada4.clase = 'cabeceraQuitar';
    this.headElements.push(entrada4);
  }

  guardar() {
    if(this.compruebaFallos()){
      if (this.clienteEditado._id) {
        this.actualizar();
      } else {
        this.crear();
      }
    }
  }

  actualizar() {
    this.dm.updateCliente(this.clienteEditado).then((res) => {
      let index = this.globalService.clientes.indexOf(
        this.globalService.clientes.find(x => x._id === this.clienteEditado._id)
      );
      this.globalService.clientes[index] = this.clienteEditado;
      if(this.clienteEditado._id==this.globalService.cliente._id){
        this.globalService.setCliente(this.clienteEditado);
      }
      this.router.navigateByUrl('seleccionaCliente', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/clientes"]));
    }).catch((err) => {
      console.log(err);
    });
  }

  crear() {
    this.dm.createCliente(this.clienteEditado).then((res) => {
      this.globalService.clientes.push(this.clienteEditado);
      this.router.navigateByUrl('/clientes');
    }).catch((err) => {
      console.log(err);
    });
  }

  checkFormIsFullfilled() {
    let disabled = true;

    if (this.clienteEditado.nombre && this.clienteEditado.apellidos && this.clienteEditado.dni) {
      disabled = false;
    }

    return disabled;
  }

  agregarContacto() {
    this.cookieService.set(CONST_COOKIE_CLIENTEEDITADO, JSON.stringify(this.clienteEditado));
    this.globalService.generaVentana(255, 250, '/formClientesContactos', 'nuevo-contacto');
    // this.router.navigate([""]);
  }

  tooltip(e) {
    let tooltips: NodeListOf<HTMLElement> = document.querySelectorAll('.texto_error span');
    let x = (e.clientX + 20) + 'px',
      y = (e.clientY + 20) + 'px';
    if (tooltips) {
      for (let i = 0; i < tooltips.length; i++) {
        tooltips[i].style.top = y;
        tooltips[i].style.left = x;
      }
    }
  }

  cambia(key) {
    switch (key) {
      case 'nombre':
        this.errores.nombre = '';
        break;

      case 'apellidos':
        this.errores.apellidos = '';
        break;

      case 'direccion':
        this.errores.direccion = '';
        break;

      case 'codPostal':
        this.errores.codPostal = '';
        break;

      case 'poblacion':
        this.errores.poblacion = '';
        break;

      case 'email':
        this.errores.email = '';
        break;

      case 'dni':
        this.errores.dni = '';
        break;

      case 'fecNac':
        this.errores.fecNac = '';
        break;

      default:
        break;
    }
  }

  compruebaFallos() {
    let res = true;
    if (!this.clienteEditado.nombre) {
      this.errores.nombre = "obligatorio";
      res = false;
    }
    if (!this.clienteEditado.apellidos) {
      this.errores.apellidos = "obligatorio";
      res = false;
    }
    if (!this.clienteEditado.dni) {
      this.errores.dni = "obligatorio";
      res = false;
    }
    if (this.clienteEditado.email) {
      if(!this.clienteEditado.email.includes('@')){
        this.errores.email = "formato";
        res = false;
      }
    }
    if(this.compruebaFechaFuturo(this.clienteEditado.fecNac)){
      this.errores.fecNac = "fechaFuturo";
      res = false;
    }
    if(this.clienteEditado.codPostal){
      let patt= new RegExp('^[0-9]*$');
      if (!patt.test(this.clienteEditado.codPostal.toString())) {
        this.errores.codPostal = 'patron';
        res = false;
      }
    }
    return res;
  }

  compruebaFechaFuturo(fecha){
    let res: boolean = false;
    let now: Date = new Date();
    if(fecha){
      if(new Date(fecha)>now){
        res = true;
      }
    }
    return res;
  }

  deleteContact(el: Contacto) {
    this.dm.deleteContacto(this.clienteEditado._id, el._id).then((_) => {
      let index = this.clienteEditado.contactos.indexOf(el);
      this.clienteEditado.contactos.splice(index, 1);
    });
  }


}
