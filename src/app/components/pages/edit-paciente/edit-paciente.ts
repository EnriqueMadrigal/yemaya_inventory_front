import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alertServices';
import { Paciente } from '../../../models/Paciente';
import { PacienteService } from '../../../services/paciente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth';
import { User } from '../../../models/User';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-paciente',
  imports: [ReactiveFormsModule], 
  templateUrl: './edit-paciente.html',
  styleUrl: './edit-paciente.css',
})
export class EditPaciente implements OnInit {
  
pacienteForm!: FormGroup;
authService: any;
  curUser!: User;
  userId =  "";
  isLoading = false;
  

  currentUser: Paciente = {
  id: 0,
  Nombres: "",
  Amaterno: "",
  Apaterno: "",
  FechaNac: new Date(),
  created: new Date(),
  sexo: 0,
  estadocivil: 0,
  comentarios: "",
  apodo: "",
  calle: "",
  estado: 14,
  municipio: 1,
  cp: 0,
  telefonoCasa: "",
  telefonoCelular: "",
  escuela: 0,
  grado: 0,
  modified: new Date(),
  religion: 0,
  email: "",
  ocupacion: 1,
  urgencia: "",
  numext: "",
  numint: "",
  tiposangre: 0,
  imss: "",
  idpersona: 0,
  notificacion: false, // tinyint(1) generalmente se mapea como boolean
  colonia: "",
  consultorio: 0,
  uniqueid: ""

};

  constructor(private router: Router,
    private alerts: AlertService,
    private fb: FormBuilder, 
    private pacienteService: PacienteService,
   private auth: AuthService ) {
    this.authService = auth;
   }

  ngOnInit(): void {
  this.initForm();
    this.userId = this.auth.getUserId() ?? "0";
  }



initForm(): void {
  // Inicialización del FormGroup con los valores de currentUser

this.pacienteForm = new FormGroup({
      id: new FormControl(this.currentUser.id),
      Nombres: new FormControl(this.currentUser.Nombres, [
        Validators.required, 
        Validators.maxLength(60)
      ]),
      Apaterno: new FormControl(this.currentUser.Apaterno, [Validators.maxLength(60)]),
      Amaterno: new FormControl(this.currentUser.Amaterno, [Validators.maxLength(60)]),
      FechaNac: new FormControl(this.formatDate(this.currentUser.FechaNac), [Validators.required]),
      sexo: new FormControl(this.currentUser.sexo, [Validators.required]),
      estadocivil: new FormControl(this.currentUser.estadocivil),
      apodo: new FormControl(this.currentUser.apodo, [Validators.maxLength(60)]),
      calle: new FormControl(this.currentUser.calle, [Validators.maxLength(60)]),
      colonia: new FormControl(this.currentUser.colonia, [Validators.maxLength(60)]),
      numext: new FormControl(this.currentUser.numext),
      numint: new FormControl(this.currentUser.numint),
      cp: new FormControl(this.currentUser.cp),
      estado: new FormControl(this.currentUser.estado),
      municipio: new FormControl(this.currentUser.municipio),
      telefonoCasa: new FormControl(this.currentUser.telefonoCasa, [Validators.maxLength(12)]),
      telefonoCelular: new FormControl(this.currentUser.telefonoCelular, [Validators.maxLength(12)]),
      email: new FormControl(this.currentUser.email, [
        Validators.email, 
        Validators.maxLength(60)
      ]),
      religion: new FormControl(this.currentUser.religion),
      ocupacion: new FormControl(this.currentUser.ocupacion),
      escuela: new FormControl(this.currentUser.escuela),
      grado: new FormControl(this.currentUser.grado),
      tiposangre: new FormControl(this.currentUser.tiposangre),
      imss: new FormControl(this.currentUser.imss, [Validators.maxLength(17)]),
      urgencia: new FormControl(this.currentUser.urgencia, [Validators.maxLength(100)]),
      comentarios: new FormControl(this.currentUser.comentarios, [Validators.maxLength(200)]),
      notificacion: new FormControl(this.currentUser.notificacion),
      consultorio: new FormControl(this.currentUser.consultorio),
      //idpersona: new FormControl(this.currentUser.idpersona),
      uniqueid: new FormControl(this.currentUser.uniqueid),
      created: new FormControl(this.currentUser.created),
      modified: new FormControl(this.currentUser.modified)
    });
  }

  



 private formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      const datosPaciente: Paciente = this.pacienteForm.value;
      this.isLoading = true;
      datosPaciente.idpersona = Number(this.userId);
      console.log('Datos a enviar:', datosPaciente);
      // Aquí llamarías a tu servicio para guardar en la DB

     
            this.pacienteService.register(datosPaciente)
           .subscribe({
              next: (data) => {
                this.isLoading = false;
              console.log('Success payload:', data);
              this.router.navigate(['/listadopacientes']);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.showAlert('Correo invalido o contraseña invalida');
            console.error('Unauthorized! Token might be expired.');
            // Add your logout or redirection logic here
          } 
          else if (error.status === 404) {
            this.showAlert('Error al registar el paciente');
            console.error('404.');
            // Add your logout or redirection logic here
          }
          else {
            console.error(`Other error occurred: ${error.status}`);
            this.showAlert(`Other error occurred: ${error.status}`);
          }
        }
      });




    } else {
      Object.values(this.pacienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }


async showAlert(message: string) {
    await this.alerts.error(message, 'Error');
    // Continue flow after it closes
  }



}
