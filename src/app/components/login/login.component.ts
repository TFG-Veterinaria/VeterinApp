import { Component, OnInit } from '@angular/core';
import { Usuario, Global } from '../../app.dataModels';
import { DataManagement } from '../../services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/globalService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  showError: Boolean;
  rememberPass: Boolean;
  isReady: Boolean = false;

  constructor(
    private dm: DataManagement,
    private cookieService: CookieService,
    private router: Router,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {
    //Esta es la única pantalla que tendrá siempre el mismo tema de colores. Ya que no disponemos aun de los ajustes de usuario.
    this.dm.getGlobalLogin().then((res: Global) => {
      this.rememberPass = res.recordarPass;
      if (this.rememberPass === true) {
        this.dm.getUserByToken(res.usuarioId).then((usr) => {
          console.log(usr);
          this.email = usr.email;
          this.password = usr.clave;
          this.isReady = true;
        });
      }
    });
  }

  sendLogin() {
    let currentPass = (<HTMLInputElement> document.getElementById('password')).value;
    this.dm.login(this.email, currentPass).then((res: Usuario) => {
      console.log("Login correcto");
      this.doRememberPass(res._id);
      this.cookieService.set('token', res._id);
      this.globalService.setUsuario(res);
      this.router.navigateByUrl("");
    }).catch((err) => {
      this.showError = true;
      console.log(err);
    });
  }

  doRememberPass(userId: string) {
    this.dm.updateGlobalLogin(userId, String(this.rememberPass)).then((_) => {

    }).catch((err) => {
      console.log(err);
    });
  }

  test($event) {
     console.log($event);
  }
}
