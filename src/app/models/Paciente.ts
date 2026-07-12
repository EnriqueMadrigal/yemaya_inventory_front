export interface Paciente {
  id?: number; // Opcional si es autoincremental al crear
  Nombres: string;
  Amaterno?: string;
  Apaterno?: string;
  FechaNac: Date | string;
  created: Date | string;
  sexo: number;
  estadocivil: number;
  comentarios?: string;
  apodo?: string;
  calle?: string;
  estado: number;
  municipio: number;
  cp: number;
  telefonoCasa?: string;
  telefonoCelular?: string;
  escuela: number;
  grado: number;
  modified?: Date | string;
  religion: number;
  email?: string;
  ocupacion: number;
  urgencia?: string;
  numext: string;
  numint: string;
  tiposangre: number;
  imss?: string;
  idpersona: number;
  notificacion: boolean; // tinyint(1) generalmente se mapea como boolean
  colonia?: string;
  consultorio: number;
  uniqueid?: string;
}