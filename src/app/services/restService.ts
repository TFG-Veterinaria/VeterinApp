import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './../../config/configService';
import { AbstractWS } from './abstractService';
import { Injectable } from '@angular/core';
import { Usuario, Ajustes, Global, Veterinario, Clinica } from '../app.dataModels';
import { Cliente } from '../app.dataModels';

@Injectable()
export class RestWS extends AbstractWS {
  path = '';
  clinicaId = '';

  constructor(
    private config: ConfigService,
    http: HttpClient,
  ) {
    super(http);
    this.path = this.config.config().restUrlPrefix;
    this.clinicaId = this.config.config().clinicaId;
  }
  // Methods
  public login(email, clave) {
    const fd = new HttpParams().set('email', email).set('clave', clave);
    return this.makePostRequest(this.path + 'usuarios/login', fd).then((res: Usuario) => {
      console.log('Logged successfully');
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getClients(filters?):Promise<Cliente[]> {
    const fd = new HttpParams();
    if (filters) {
      fd.set('filters', filters);
    }
    return this.makeGetRequest(this.path + 'clientes', fd).then((res: Cliente[]) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getCliente(id: string) {
    const fd = new HttpParams();
    return this.makeGetRequest(this.path + 'clientes/' + id, fd).then((res: String) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getUserByToken(token: string) {
    const fd = new HttpParams();
    return this.makeGetRequest(this.path + 'usuarios/token/' + token, fd).then((res: Usuario) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.error('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public updateAjustes(ajustes: Ajustes, token: string) {
    const fd = new HttpParams()
      .set('tema', ajustes.tema)
      .set('tamLetra', ajustes.tamLetra)
      .set('recordatorio', ajustes.recordatorio.toString())
      .set('id', ajustes._id);
    return this.makePostRequest(this.path + 'usuarios/updateAjustes/' + token, fd).then((res) => {
      console.log(res);
      return Promise.resolve(res);
    }).catch(error => {
      console.error('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getGlobalLogin(): Promise<Global> {
    const fd = new HttpParams();
    return this.makeGetRequest(this.path + 'global/login', fd).then((res: Global) => {
      return Promise.resolve(res);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public updateGlobalLogin(userId: string, recordarPass: string) {
    const fd = new HttpParams()
      .set('usuarioId', userId)
      .set('recordarPass', recordarPass);
    return this.makePostRequest(this.path + 'global/updateLogin', fd).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public getMascotas(filters?) {
    const fd = new HttpParams();
    if (filters) {
      fd.set('filters', filters);
    }
    return this.makeGetRequest(this.path + 'mascotas', fd).then((res: String) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getVeterinarios(filters?) {
    const fd = new HttpParams();
    if (filters) {
      fd.set('filters', filters);
    }
    return this.makeGetRequest(this.path + 'clinicas/' + this.clinicaId + '/veterinarios', fd).then((res: String) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getVeterinario(id: string): Promise<Veterinario> {
    return this.makeGetRequest(this.path + 'clinicas/' + this.clinicaId + '/veterinario/' + id, null).then((res: Veterinario) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public updateVeterinario(veterinario: Veterinario) {
    const fd = new HttpParams()
      .set('nombre', veterinario.nombre)
      .set('apellidos', veterinario.apellidos)
      .set('fecNac', veterinario.fecNac.toString())
      .set('dni', veterinario.dni)
      .set('telefono', veterinario.telefono)
      .set('numColegiado', veterinario.numColegiado.toString());
    return this.makePostRequest(this.path + 'clinicas/' + this.clinicaId + '/veterinario/' + veterinario._id + '/update', fd).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public deleteVeterinario(id: string) {
    return this.makePostRequest(this.path + 'clinicas/' + this.clinicaId + '/veterinario/' + id + '/delete', null).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public createVeterinario(veterinario: Veterinario) {
    const fd = new HttpParams()
      .set('nombre', veterinario.nombre)
      .set('apellidos', veterinario.apellidos)
      .set('fecNac', String(veterinario.fecNac))
      .set('dni', veterinario.dni)
      .set('telefono', veterinario.telefono)
      .set('numColegiado', String(veterinario.numColegiado));
    return this.makePostRequest(this.path + 'clinicas/' + this.clinicaId + '/veterinario/create', fd).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public updateClinica(clinica: Clinica) {
    let fd = new HttpParams()
      .set('cif', clinica.cif)
      .set('nombre', clinica.nombre)
      .set('direccion', clinica.direccion)
      .set('provincia', clinica.provincia)
      .set('poblacion', clinica.poblacion)
      .set('codPostal', String(clinica.codPostal))
      .set('pais', clinica.pais)
      .set('propietario', clinica.propietario)
      .set('dniPropietario', clinica.dniPropietario);

      if (clinica.telefono) {
        fd = fd.append('telefono', clinica.telefono);
      } else {
        fd = fd.append('telefono', '');
      }
      if (clinica.movil) {
        fd = fd.append('movil', clinica.movil);
      } else {
        fd = fd.append('movil', '');
      }
      if (clinica.fax) {
        fd = fd.append('fax', clinica.fax);
      } else {
        fd = fd.append('fax', '');
      }
      if (clinica.web) {
        fd = fd.append('web', clinica.web);
      } else {
        fd = fd.append('web', '');
      }
      if (clinica.email) {
        fd = fd.append('email', clinica.email);
      } else {
        fd = fd.append('email', '');
      }

    return this.makePostRequest(this.path + 'clinicas/' + this.clinicaId + '/update', fd).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public getClinicaById(id: string) {
    const fd = new HttpParams();

    return this.makeGetRequest(this.path + 'clinicas/' + this.clinicaId, fd).then((res: String) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public getUsuarios(filters?) {
    const fd = new HttpParams();
    if (filters) {
      fd.set('filters', filters);
    }
    return this.makeGetRequest(this.path + 'usuarios/', fd).then((res: String) => {
      return Promise.resolve(res);
    }).catch(error => {
      console.log('Error: ' + error);
      return Promise.reject(error);
    });
  }

  public createUsuario(usuario: Usuario) {
    const fd = new HttpParams()
      .set('nombre', usuario.nombre)
      .set('clave', usuario.clave)
      .set('email', usuario.email)
      .set('isAdmin', usuario.isAdmin + "");
    return this.makePostRequest(this.path + 'usuario/create', fd).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  public updateUsuario(usuario: Usuario) {
    let fd = new HttpParams()
      .set('nombre', usuario.nombre)
      .set('isAdmin', usuario.isAdmin + "")
      .set('email', usuario.email);

      console.log(usuario);
      if (usuario.clave && usuario.oldClave) {
        console.log(usuario);
        fd = fd.append('oldClave', usuario.oldClave);
        fd = fd.append('clave', usuario.clave);
      }
    return this.makePostRequest(this.path + 'usuarios/' + usuario._id + '/update', fd).then((_) => {
      return Promise.resolve();
    }).catch(error => {
      return Promise.reject(error);
    });
  }

}
