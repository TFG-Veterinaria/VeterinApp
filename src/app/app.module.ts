import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SeleccionComponent } from './components/seleccion/seleccion.component';
import { BotonMenuComponent } from './components/boton-menu/boton-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { SeleccionesComponent } from './components/selecciones/selecciones.component';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from './services/dataManagement';
import { RestWS } from './services/restService';
import { ConfigService } from '../config/configService';
import { Utils } from './utilities/Utils';
import { ListaComponent as ListaCliente } from './components/clientes/lista/lista.component';
import { ListaComponent as ListaMascotas } from './components/mascotas/lista/lista.component';
import { ListaComponent as ListaVeterinarios } from './components/app-data/veterinarios/lista/lista.component';
import { ListaComponent as ListaUsuarios } from './components/app-data/usuarios/lista/lista.component';
import { GlobalService } from './services/globalService';
import { NumberComponent } from './components/home/number/number.component';
import { DotComponent } from './components/home/dot/dot.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { AppDataComponent } from './components/app-data/app-data.component';
import { FormVeterinarioComponent } from './components/app-data/veterinarios/form-veterinario/form-veterinario.component';
import { FormClinicaComponent } from './components/app-data/clinica/form-clinica/form-clinica.component';
import { FormUsuarioComponent } from './components/app-data/usuarios/form-usuario/form-usuario.component';
import { FormMascotasComponent } from './components/mascotas/form-mascotas/form-mascotas.component';
import { AvisoNuevaMascotaComponent } from './components/mascotas/aviso-nueva-mascota/aviso-nueva-mascota.component';
import { FormClienteComponent } from './components/clientes/form-cliente/form-cliente.component';
import { ListaComponent as ListaTratamientos } from './components/operaciones/tratamientos/lista/lista.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { FormTratamientoComponent } from './components/operaciones/tratamientos/form-tratamiento/form-tratamiento.component';
import { ListaComponent } from './components/operaciones/pruebas/lista/lista.component';
import { FormPruebaComponent } from './components/operaciones/pruebas/form-prueba/form-prueba.component';
import { ResumenComponent } from './components/mascotas/resumen/resumen.component';
import { AvisoNuevoTratamientoComponent } from './components/operaciones/tratamientos/aviso-nuevo-tratamiento/aviso-nuevo-tratamiento.component';
import { FormClienteContactoComponent } from './components/clientes/form-cliente-contacto/form-cliente-contacto.component';
import { DisplayComponent as DisplayVeterinario } from './components/app-data/veterinarios/display/display.component';
import { DisplayComponent as DisplayCliente } from './components/clientes/display/display.component';
import { FormVacunaComponent } from './components/operaciones/vacunas/form-vacuna/form-vacuna.component';
import { AvisoNuevaVacunaComponent } from './components/operaciones/vacunas/aviso-nueva-vacuna/aviso-nueva-vacuna.component';
import { FormDesparasitacionComponent } from './components/operaciones/desparasitaciones/form-desparasitacion/form-desparasitacion.component';
import { AvisoNuevaDesparasitacionComponent } from './components/operaciones/desparasitaciones/aviso-nueva-desparasitacion/aviso-nueva-desparasitacion.component';
import { FormAnaliticaComponent } from './components/operaciones/analiticas/form-analitica/form-analitica.component';
import { AvisoNuevaAnaliticaComponent } from './components/operaciones/analiticas/aviso-nueva-analitica/aviso-nueva-analitica.component';
import { ListaComponent as ListaVacunas } from './components/operaciones/vacunas/lista/lista.component';
import { ListaComponent as ListaDesparasitaciones } from './components/operaciones/desparasitaciones/lista/lista.component';
import { ListaComponent as ListaAnaliticas } from './components/operaciones/analiticas/lista/lista.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SeleccionComponent,
    BotonMenuComponent,
    MenuComponent,
    SeleccionesComponent,
    LoginComponent,
    ListaCliente,
    ListaMascotas,
    ListaVeterinarios,
    ListaUsuarios,
    NumberComponent,
    DotComponent,
    AjustesComponent,
    AppDataComponent,
    FormVeterinarioComponent,
    FormClinicaComponent,
    FormUsuarioComponent,
    FormMascotasComponent,
    AvisoNuevaMascotaComponent,
    FormClienteComponent,
    OperacionesComponent,
    ListaTratamientos,
    FormTratamientoComponent,
    ListaComponent,
    FormPruebaComponent,
    ResumenComponent,
    AvisoNuevoTratamientoComponent,
    FormClienteContactoComponent,
    ResumenComponent,
    DisplayVeterinario,
    DisplayCliente,
    FormVacunaComponent,
    AvisoNuevaVacunaComponent,
    FormDesparasitacionComponent,
    AvisoNuevaDesparasitacionComponent,
    FormAnaliticaComponent,
    AvisoNuevaAnaliticaComponent,
    ListaVacunas,
    ListaDesparasitaciones,
    ListaAnaliticas
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    CookieService,
    DataManagement,
    RestWS,
    ConfigService,
    Utils,
    GlobalService
  ],
  bootstrap: [AppComponent],
},
)
export class AppModule { }
