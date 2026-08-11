import { Component, OnInit, inject ,input, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../services/alertServices';
import { BasicModel } from '../../../../models/BasicModel';
import { UbicacionService } from '../../../../services/ubicacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseData } from '../../../../models/ResponseData';



@Component({
  selector: 'app-edit-ubicacion',
   imports: [ReactiveFormsModule], 
  templateUrl: './edit-ubicacion.html',
  styleUrl: './edit-ubicacion.css',
})
export class EditUbicacion implements OnInit{

dataForm!: FormGroup;
 isLoading = false;
currentData: BasicModel = {
  id: 0,
  nombre: ""
}

constructor(private router: Router,
    private alerts: AlertService,
    private fb: FormBuilder, 
    private ubicacionService: UbicacionService,
    private route: ActivatedRoute ) {}


ngOnInit(): void {
  this.initForm();

  const id = this.route.snapshot.paramMap.get('id') ?? "";
   
if (id != "0") {
      this.safeCall(id);
    }

    console.log(id);

}


initForm(): void {
  // Inicialización del FormGroup con los valores de currentUser

this.dataForm = new FormGroup({
      id: new FormControl(this.currentData.id),
      nombre: new FormControl(this.currentData.nombre, [
        Validators.required, 
        Validators.maxLength(60)
      ]),
      
    });
  }

  

onSubmit(): void {
    if (this.dataForm.valid) {
      const datos: BasicModel = this.dataForm.value;
      this.isLoading = true;
      console.log('Datos a enviar:', datos);
      // Aquí llamarías a tu servicio para guardar en la DB
          //Registro de nuevos datos
         
        if(datos.id == 0) {
          this.RegisterNew(datos);
        }
        else {
          this.Update(datos);
        }

    } else {
      Object.values(this.dataForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }



private RegisterNew(datos :BasicModel) {

    this.ubicacionService.register(datos)
           .subscribe({
              next: (data: ResponseData) => {
                this.isLoading = false;
              console.log('Success payload:', data);
                if (data.error) {
                     this.showAlert(data.message);
                }
                else {
                  this.router.navigate(['/listadoUbicaciones']);
                }

              
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
           const errorMessage = error.error?.message || error.message || 'An unknown error occurred';
          if (error.status === 401) {
            this.showAlert('Correo invalido o contraseña invalida');
            console.error('Unauthorized! Token might be expired.');
            // Add your logout or redirection logic here
          } 
          else if (error.status === 404) {
            this.showAlert('Error al registar');
            console.error('404.');
            // Add your logout or redirection logic here
          }
          else {
            console.error(`Other error occurred: ${error}`);
            this.showAlert(`Other error occurred: ${error.status} ${errorMessage}`);
          }
        }
      });
  

    
  }


private Update(datos :BasicModel) {

    this.ubicacionService.update(datos)
           .subscribe({
              next: (data: ResponseData) => {
                this.isLoading = false;
              console.log('Success payload:', data);
                if (data.error) {
                     this.showAlert(data.message);
                }
                else {
                  this.router.navigate(['/listadoUbicaciones']);
                }

              
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
           const errorMessage = error.error?.message || error.message || 'An unknown error occurred';
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
            console.error(`Other error occurred: ${error}`);
            this.showAlert(`Other error occurred: ${error.status} ${errorMessage}`);
          }
        }
      });
  
    }


async safeCall(id: string) {
   

      this.ubicacionService.getUbicacion(id).subscribe({
        next: (data) => {
           //this.pacientes = [...this.pacientes, data];   
                    this.currentData = data;   
          this.dataForm.patchValue(this.currentData);
          console.log(this.currentData);

        },
        error: (err) => {
          console.error("Error reading ubicaciones");
        }

      });

    //const data = await firstValueFrom(this.pacienteService.getPacientes()); 

  
}



async showAlert(message: string) {
    await this.alerts.error(message, 'Error');
    // Continue flow after it closes
  }


clickCancel(){
    this.router.navigate(['/listadoUbicaciones']);
}



}
