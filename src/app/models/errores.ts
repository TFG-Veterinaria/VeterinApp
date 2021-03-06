export class ErroresFormMascota {
    nombre: string;
    chip: string;
    fechaNac: string;
    fechaFac: string;
    sexo: string;
    estado: string;
    pelo: string;
    capa: string;
    especie: string;
    raza: string;
}

export class ErroresFormVeterinario {
    nombre: string;
    apellidos: string;
    dni: string;
    numColegiado: string;
    fecNac: string;
    telefono: string;
}

export class ErroresFormClinica {
    cif: string;
    nombre: string;
    direccion: string;
    telefono: string;
    movil: string;
    fax: string;
    poblacion: string;
    provincia: string;
    pais: string;
    codPostal: string;
    web: string;
    imagen: string;
    email: string;
    propietario: string;
    dniPropietario: string;
}

export class ErroresFormUsuario {
    nombre: string;
    email: string;
    antiguaClave: string;
    clave: string;
    claveRepetida: string;
}

export class ErroresFormCliente {
    nombre: string;
    apellidos: string;
    direccion: string;
    codPostal: string;
    poblacion: string;
    dni: string;
    email: string;
    fecNac: string;
}

export class ErroresFormContacto {
    nombre: string;
    telefono: string;
    tipo: string;
}

export class ErroresFormTratamientos {
  anamnesis: string;
  diagnostico: string;
  tipoTratamiento: string;
  fecha: string;
}

export class ErroresFormVacunas {
  fecha: string;
  tipoVacuna: string;
}

export class ErroresFormAnaliticas {
  nombre: string;
  descripcion: string;
  resultado: string;
  fecha: string;
}

export class ErroresFormDesparasitaciones {
  fecha: string;
  tipoDesparasitacion: string;
}
