import { Component, OnInit } from '@angular/core';
import { Veterinario } from '../../../app.dataModels';
import { GlobalService } from '../../../services/globalService';
import { DataManagement } from '../../../services/dataManagement';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-veterinario',
  templateUrl: './form-veterinario.component.html',
  styleUrls: ['./form-veterinario.component.scss']
})
export class FormVeterinarioComponent implements OnInit {

  tema = "_oscuro";
  new: boolean;
  ready = false;
  veterinarioEditado: Veterinario = new Veterinario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private dm: DataManagement
  ) { }

  ngOnInit() {
    if ((<HTMLInputElement>document.getElementById('dt'))) {
      (<HTMLInputElement>document.getElementById('dt')).max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    }
    this.tema = "_" + this.globalService.getTema();
    this.route.params.forEach(params => {
      if (params) {
        this.new = false;
        this.veterinarioEditado._id = params["id"];
        this.veterinarioEditado.nombre = params["nombre"];
        this.veterinarioEditado.apellidos = params["apellidos"];
        this.veterinarioEditado.dni = params["dni"];
        this.veterinarioEditado.fecNac = params["fecNac"];
        this.veterinarioEditado.numColegiado = params["numColegiado"];
        this.veterinarioEditado.telefono = params["telefono"] != null ? params["telefono"] : "" ;
        this.ready = true;
      } else {
        this.new = true;
      }
    });
  }

  guardar() {
    if (this.veterinarioEditado._id) {
      this.actualizar();
    } else {
      this.crear();
    }
  }

  actualizar() {
    this.dm.updateVeterinario(this.veterinarioEditado).then((res) => {
      this.router.navigateByUrl('/veterinarios');
    }).catch((err) => {
      this.router.navigateByUrl('/veterinarios');
    });
  }

  crear() {
    this.dm.createVeterinario(this.veterinarioEditado).then((res) => {
      this.globalService.getVeterinarios();
      this.router.navigateByUrl('/veterinarios');
    }).catch((err) => {
      this.globalService.getVeterinarios();
      this.router.navigateByUrl('/veterinarios');
    });
  }

  checkFormIsFullfilled() {
    let disabled = true;

    if (this.veterinarioEditado.nombre && this.veterinarioEditado.apellidos && this.veterinarioEditado.dni && this.veterinarioEditado.numColegiado) {
      disabled = false;
    }

    return disabled;
  }

}
