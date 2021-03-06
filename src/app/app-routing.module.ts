import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaComponent as ListaClientes } from './components/clientes/lista/lista.component';
import { ListaComponent as ListaMascotas } from './components/mascotas/lista/lista.component';
import { ListaComponent as ListaVeterinarios } from './components/app-data/veterinarios/lista/lista.component';
import { ListaComponent as ListaUsuarios } from './components/app-data/usuarios/lista/lista.component';
import { SeleccionComponent } from './components/seleccion/seleccion.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { AppDataComponent } from './components/app-data/app-data.component';
import { FormVeterinarioComponent } from './components/app-data/veterinarios/form-veterinario/form-veterinario.component';
import { FormClinicaComponent } from './components/app-data/clinica/form-clinica/form-clinica.component';
import { FormUsuarioComponent } from './components/app-data/usuarios/form-usuario/form-usuario.component';
import { FormMascotasComponent } from './components/mascotas/form-mascotas/form-mascotas.component';
import { AvisoNuevaMascotaComponent } from './components/mascotas/aviso-nueva-mascota/aviso-nueva-mascota.component';
import { FormClienteComponent } from './components/clientes/form-cliente/form-cliente.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { ListaComponent as ListaTratamientos } from './components/operaciones/tratamientos/lista/lista.component';
import { FormTratamientoComponent } from './components/operaciones/tratamientos/form-tratamiento/form-tratamiento.component';
import { ListaComponent as ListaPruebas } from './components/operaciones/pruebas/lista/lista.component';
import { FormPruebaComponent } from './components/operaciones/pruebas/form-prueba/form-prueba.component';
import { ResumenComponent } from './components/mascotas/resumen/resumen.component';
import { AvisoNuevoTratamientoComponent } from './components/operaciones/tratamientos/aviso-nuevo-tratamiento/aviso-nuevo-tratamiento.component';
import { FormClienteContactoComponent } from './components/clientes/form-cliente-contacto/form-cliente-contacto.component';
import { DisplayComponent as DisplayVeterinario } from './components/app-data/veterinarios/display/display.component';
import { ListaComponent as ListaVacunas } from './components/operaciones/vacunas/lista/lista.component';
import { FormVacunaComponent } from './components/operaciones/vacunas/form-vacuna/form-vacuna.component';
import { AvisoNuevaVacunaComponent } from './components/operaciones/vacunas/aviso-nueva-vacuna/aviso-nueva-vacuna.component';
import { FormDesparasitacionComponent } from './components/operaciones/desparasitaciones/form-desparasitacion/form-desparasitacion.component';
import { AvisoNuevaDesparasitacionComponent } from './components/operaciones/desparasitaciones/aviso-nueva-desparasitacion/aviso-nueva-desparasitacion.component';
import { ListaComponent as ListaDesparasitaciones } from './components/operaciones/desparasitaciones/lista/lista.component';
import { FormAnaliticaComponent } from './components/operaciones/analiticas/form-analitica/form-analitica.component';
import { AvisoNuevaAnaliticaComponent } from './components/operaciones/analiticas/aviso-nueva-analitica/aviso-nueva-analitica.component';
import { ListaComponent as ListaAnaliticas } from './components/operaciones/analiticas/lista/lista.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'clientes' , component: ListaClientes },
    { path: 'mascotas' , component: ListaMascotas },
    { path: 'seleccionaCliente' , component: SeleccionComponent },
    { path: 'seleccionaMascota' , component: SeleccionComponent },
    { path: 'seleccionaVeterinario' , component: SeleccionComponent },
    { path: 'ajustes' , component: AjustesComponent },
    { path: 'usuarios' , component: ListaUsuarios },
    { path: 'appData' , component: AppDataComponent },
    { path: 'veterinarios' , component: ListaVeterinarios },
    { path: 'formVeterinario' , component: FormVeterinarioComponent },
    { path: 'formClinica' , component: FormClinicaComponent },
    { path: 'formUsuario' , component: FormUsuarioComponent },
    { path: 'formMascotas' , component: FormMascotasComponent },
    { path: 'formClientes', component: FormClienteComponent},
    { path: 'formClientesContactos', component: FormClienteContactoComponent },
    { path: 'avisoNuevaMascota' , component: AvisoNuevaMascotaComponent },
    { path: 'operaciones', component: OperacionesComponent },
    { path: 'tratamientos', component: ListaTratamientos },
    { path: 'formTratamiento', component: FormTratamientoComponent },
    { path: 'avisoNuevoTratamiento', component: AvisoNuevoTratamientoComponent },
    { path: 'pruebas', component: ListaPruebas },
    { path: 'formPrueba', component: FormPruebaComponent },
    { path: 'mascota/:idMascota', component: ResumenComponent },
    { path: 'displayVeterinario', component: DisplayVeterinario },
    { path: 'vacunas', component: ListaVacunas },
    { path: 'formVacuna', component: FormVacunaComponent },
    { path: 'avisoNuevaVacuna', component: AvisoNuevaVacunaComponent },
    { path: 'desparasitaciones', component: ListaDesparasitaciones },
    { path: 'formDesparasitacion', component: FormDesparasitacionComponent },
    { path: 'avisoNuevaDesparasitacion', component: AvisoNuevaDesparasitacionComponent },
    { path: 'analiticas', component: ListaAnaliticas },
    { path: 'formAnalitica', component: FormAnaliticaComponent },
    { path: 'avisoNuevaAnalitica', component: AvisoNuevaAnaliticaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule { }
