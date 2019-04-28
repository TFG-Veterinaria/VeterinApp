import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/globalService';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nombreUsuario: String;
  hora: number;
  mensajeBienvenida: String;
  time: Date = new Date();
  now:string=('0'+this.time.getHours()).substr(-2) + ('0'+this.time.getMinutes()).substr(-2) + ('0'+this.time.getSeconds()).substr(-2);
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private globalService: GlobalService
  ) {
    console.log("el usuario tiene token: "+this.cookieService.get("token"));
    const token = this.cookieService.get("token");
    const isUserLogged = token ? true : false;
    console.log("isUserLogged: "+isUserLogged);
    console.log("token: "+token);
    if (!isUserLogged) {
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {
    console.log("el nombre del usuario es: "+this.globalService.getUsuario().nombre);
    this.nombreUsuario = this.globalService.getUsuario().nombre;
    if(this.time.getHours()<12 && this.time.getHours() >= 3){
      this.setBienvenida('M');
    } else if(this.time.getHours()<20 && this.time.getHours()>=2){
      this.setBienvenida('T');
    } else {
      this.setBienvenida('N');
    }
    let timeoutId = setInterval(() => {        
      this.time = new Date();
      this.now = ('0'+this.time.getHours()).substr(-2) + ('0'+this.time.getMinutes()).substr(-2) + ('0'+this.time.getSeconds()).substr(-2);
      if(this.time.getHours()<12 && this.time.getHours() >= 3){
        this.setBienvenida('M');
      } else if(this.time.getHours()<20 && this.time.getHours()>=2){
        this.setBienvenida('T');
      } else {
        this.setBienvenida('N');
      }
    }, 1000);
  }
 
  setBienvenida(estado:string){
    if(estado=='M'){
      this.mensajeBienvenida="Buenos días, ";
    } else if(estado=='T'){
      this.mensajeBienvenida="Buenas tardes, ";
    } else {
      this.mensajeBienvenida="Buenas noches, ";
    }
  }
}
