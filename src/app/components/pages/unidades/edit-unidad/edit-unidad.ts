import { Component, OnInit, inject ,input, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../services/alertServices';
import { Unidad } from '../../../../models/Unidad';
import { BasicModel } from '../../../../models/BasicModel';
import { UnidadbasicaService } from '../../../../services/unidadbasica.service';
import { UnidadService } from '../../../../services/unidad.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseData } from '../../../../models/ResponseData';



@Component({
  selector: 'app-edit-unidad',
   imports: [ReactiveFormsModule], 
  templateUrl: './edit-unidad.html',
  styleUrl: './edit-unidad.css',
})
export class EditUnidad implements OnInit{

dataForm!: FormGroup;
isLoading = false;
unidadbasicas = signal<BasicModel[]>([]);

currentData: Unidad = {
  id: 0,
  nombre: "",
  id_unidad_basica: 0,
  cantidad_medida: 0
};


constructor(private router: Router,
    private alerts: AlertService,
    private fb: FormBuilder, 
    private unidadService: UnidadService,
    private route: ActivatedRoute,
    private unidadbasicaService: UnidadbasicaService) {}


ngOnInit(): void {
  this.initForm();

  const id = this.route.snapshot.paramMap.get('id') ?? "";
  this.safeCallBasicas();
   
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
      id_unidad_basica: new FormControl(this.currentData.id_unidad_basica, [
        Validators.required, 
      ]),
      cantidad_medida: new FormControl(this.currentData.cantidad_medida, [
        Validators.required, 
      ]),
      
    });
  }

  

onSubmit(): void {
    if (this.dataForm.valid) {
      const datos: Unidad = this.dataForm.value;
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



private RegisterNew(datos :Unidad) {

    this.unidadService.register(datos)
           .subscribe({
              next: (data: ResponseData) => {
                this.isLoading = false;
              console.log('Success payload:', data);
                if (data.error) {
                     this.showAlert(data.message);
                }
                else {
                  this.router.navigate(['/listadounidades']);
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


private Update(datos :Unidad) {

    this.unidadService.update(datos)
           .subscribe({
              next: (data: ResponseData) => {
                this.isLoading = false;
              console.log('Success payload:', data);
                if (data.error) {
                     this.showAlert(data.message);
                }
                else {
                  this.router.navigate(['/listadounidades']);
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
   

      this.unidadService.getunidad(id).subscribe({
        next: (data) => {
           //this.pacientes = [...this.pacientes, data];   
                    this.currentData = data;   
          this.dataForm.patchValue(this.currentData);
          console.log(this.currentData);

        },
        error: (err) => {
          console.error("Error reading unidads");
        }

      });

    //const data = await firstValueFrom(this.pacienteService.getPacientes()); 

  
}

async safeCallBasicas() {
  console.log("obteniendo");
      this.unidadbasicaService.getunidadbasicas().subscribe({
        next: (data) => {
         this.unidadbasicas.update(currentItems => data);   
          console.log(this.unidadbasicas);
        },
        error: (err) => {
          console.error("Error reading unidadbasicaes");
        }

      });

}



async showAlert(message: string) {
    await this.alerts.error(message, 'Error');
    // Continue flow after it closes
  }


clickCancel(){
    this.router.navigate(['/listadounidades']);
}



}
