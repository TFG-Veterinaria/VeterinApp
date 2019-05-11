import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from '../services/dataManagement';
import { Ajustes, Usuario, Mascota, Veterinario, Cliente, Clinica } from '../app.dataModels';
import { FiltroCliente } from '../models/filtros';

@Injectable()
export class GlobalService {
  cliente: Cliente;
  veterinario: Veterinario;
  mascota: Mascota;
  usuario: Usuario;
  token: string;
  ajustes: Ajustes;
  clientes: Cliente[];
  mascotas: Mascota[];
  clinica: Clinica;
  veterinarios: Veterinario[];
  filtroCliente: FiltroCliente;

  constructor(
    private coockieService: CookieService,
    private dm: DataManagement
  ) {
    this.initialize();
  }

  private initialize(){

    //Inicializamos el cliente, el veterinario y la mascota con id=0
    this.cliente = new Cliente();
    this.cliente._id = "0";
    this.veterinario = new Veterinario();
    this.veterinario._id = "0";
    this.mascota = new Mascota();
    this.mascota._id = "0";

    //Comprobamos si disponemos de token, en caso positivo, guardamos el usuario perteneciente al token.
    this.token = this.coockieService.get("token");
    if (this.token == "undefined") {
      //Este método se ha realizado para el entorno de desarrollo, donde en ocasiones se pierde el token al guardar cambios en caliente.
      this.metodoParaDesarrollo();
    } else if (this.token) {
      this.getUsuarioPorToken();
    }

    //Inicializamos los filtros
    this.inicializaFiltroCliente();

    //Inicializamos las colecciones que usaremos más adelante en la aplicación.
    this.getClientes();
    this.getMascotas();
    this.getClinica();
    this.getCalendario();
    this.getTarifas();

  }

  private getClientes() {
    this.clientes = [];
    this.dm.getClients().then((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  private getMascotas() {
    this.mascotas = [];
    this.dm.getMascotas().then((mascotas: Mascota[]) => {
      this.mascotas = mascotas;
    });
  }

  private getClinica() {
    //TODO
    this.clinica = new Clinica();
    this.veterinarios = [];
  }

  private getCalendario() {
    //TODO
  }

  private getTarifas() {
    //TODO
  }

  // --- CLIENTE ---

  setCliente(nuevoCliente: Cliente) {
    this.cliente = nuevoCliente;
  }

  getCliente() {
    return this.cliente;
  }

  // --- VETERINARIO ---

  setVeterinario(nuevoVeterinario: Veterinario) {
    this.veterinario = nuevoVeterinario;
  }

  getVeterinario() {
    return this.veterinario;
  }

  // --- MASCOTA ---

  setMascota(nuevaMascota: Mascota) {
    this.mascota = nuevaMascota;
  }

  getMascota() {
    return this.mascota;
  }

  // --- SELECTORES ---

  limpiarCliente() {
    this.limpiarMascota();
    this.cliente = new Cliente();
    this.cliente._id = "0";
    return this.cliente;
  }

  limpiarMascota() {
    this.mascota = new Mascota();
    this.mascota._id = "0";
    return this.mascota;
  }

  limpiarVeterinario() {
    this.veterinario = new Veterinario();
    this.veterinario._id = "0";
    return this.veterinario;
  }

  // --- USUARIO ---

  getUsuario() {
    return this.usuario;
  }

  getUsuarioPorToken() {
    this.dm.getUserByToken(this.token).then((res: Usuario) => {
      this.setUsuario(res);
      this.coockieService.set("token", res._id);
    });
  }

  setUsuario(user: Usuario) {
    this.usuario = new Usuario();
    this.ajustes = new Ajustes();
    this.ajustes = user.ajustes;
    this.usuario = user;

  }

  getTema() {
    if (this.getUsuario()) {
      if (this.ajustes) {
        return this.getUsuario().ajustes.tema;
      } else {
        return "oscuro";
      }
    } else {
      return "oscuro";
    }
  }

  cambiarTema(tema: string) {
    if (this.getUsuario()) {
      this.ajustes.tema = tema;
      this.usuario.ajustes = this.ajustes;
    }
    return this.ajustes;
  }

  cerrarSesion() {
    this.coockieService.deleteAll();
    this.cliente = new Cliente();
    this.veterinario = new Veterinario();
    this.mascota = new Mascota();
    this.cliente._id = "0";
    this.veterinario._id = "0";
    this.mascota._id = "0";
    this.usuario = new Usuario();
    this.token = "";
    this.ajustes = new Ajustes();
    return this.ajustes;
  }

  // --- FILTROS ---
  
  inicializaFiltroCliente(){
    this.filtroCliente = new FiltroCliente();
    this.filtroCliente.nombre = '';
    this.filtroCliente.apellidos = '';
    this.filtroCliente.dni = '';
    this.filtroCliente.telefono = '';
    this.filtroCliente.morosos = false;
    this.filtroCliente.citados = false;
    this.filtroCliente.porMascota = false;
    this.filtroCliente.atendidos = false;
  }

  setFiltroCliente(filtro:FiltroCliente){
    this.filtroCliente = filtro;
  }

  // --- OTROS ---

  private metodoParaDesarrollo() {
    this.token = "5ca0e4fc34eaf00d889a9fee";
    this.getUsuarioPorToken();
  }


}
