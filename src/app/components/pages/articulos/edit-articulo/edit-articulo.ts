import { Component, OnInit, inject ,input, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../services/alertServices';
import { Articulo } from '../../../../models/Articulo';
import { ArticuloService } from '../../../../services/articulo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseData } from '../../../../models/ResponseData';
import { Unidad } from '../../../../models/Unidad';
import { BasicModel } from '../../../../models/BasicModel';
import { FamiliaService } from '../../../../services/familia.service';
import { UnidadService } from '../../../../services/unidad.service';
import { MarcaService } from '../../../../services/marca.service';
import { UbicacionService } from '../../../../services/ubicacion.service';
import { UnidadbasicaService } from '../../../../services/unidadbasica.service';




@Component({
  selector: 'app-edit-articulo',
   imports: [ReactiveFormsModule], 
  templateUrl: './edit-articulo.html',
  styleUrl: './edit-articulo.css',
})
export class EditArticulo implements OnInit{

dataForm!: FormGroup;
 isLoading = false;
currentData: Articulo = {
  id: 0,
  nombre_producto: "",
  id_familia: 1,
  id_ubicacion: 1,
  id_unidad: 1,
  cantidad: 0,
  minima_cantidad: 0,
  costo: 0,
  valor_inventario: 0,
  updated_by: 0
}


unidades = signal<BasicModel[]>([]);
familias = signal<BasicModel[]>([]);
marcas = signal<BasicModel[]>([]);
ubicaciones = signal<BasicModel[]>([]);

constructor(private router: Router,
    private alerts: AlertService,
    private fb: FormBuilder, 
    private articuloService: ArticuloService,
    private route: ActivatedRoute,
    private unidadbasicaService: UnidadbasicaService,
    private familiaService: FamiliaService,
    private marcaService: MarcaService,
    private ubicacionService: UbicacionService
) {}


ngOnInit(): void {
this.safeCallUnidades();
this.safeCallFamilias();
this.safeCallMarcas();
this.safeCallUbicaciones();

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
      nombre_producto: new FormControl(this.currentData.nombre_producto, [
        Validators.required, 
        Validators.maxLength(60)
      ]),
      id_familia: new FormControl(this.currentData.id_familia),
      id_ubicacion: new FormControl(this.currentData.id_ubicacion),
      id_unidad: new FormControl(this.currentData.id_unidad),
      id_marca: new FormControl(1),
      minima_cantidad: new FormControl(this.currentData.minima_cantidad),
      cantidad: new FormControl(0),
      costo: new FormControl(0),
      valor_inventario: new FormControl(0),
      cantidad_anterior: new FormControl(0)
    
    });
  }

  

onSubmit(): void {
    if (this.dataForm.valid) {
      const datos: Articulo = this.dataForm.value;
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



private RegisterNew(datos :Articulo) {

    this.articuloService.register(datos)
           .subscribe({
              next: (data: ResponseData) => {
                this.isLoading = false;
              console.log('Success payload:', data);
                if (data.error) {
                     this.showAlert(data.message);
                }
                else {
                  this.router.navigate(['/listadoArticulos']);
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


private Update(datos :Articulo) {

    this.articuloService.update(datos)
           .subscribe({
              next: (data: ResponseData) => {
                this.isLoading = false;
              console.log('Success payload:', data);
                if (data.error) {
                     this.showAlert(data.message);
                }
                else {
                  this.router.navigate(['/listadoArticulos']);
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
   

      this.articuloService.getarticulo(id).subscribe({
        next: (data) => {
           //this.pacientes = [...this.pacientes, data];   
                    this.currentData = data;   
          this.dataForm.patchValue(this.currentData);
          console.log(this.currentData);

        },
        error: (err) => {
          console.error("Error reading articulos");
        }

      });

    //const data = await firstValueFrom(this.pacienteService.getPacientes()); 

  
}



async showAlert(message: string) {
    await this.alerts.error(message, 'Error');
    // Continue flow after it closes
  }


clickCancel(){
    this.router.navigate(['/listadoArticulos']);
}




async safeCallUnidades() {
  console.log("obteniendo");
      this.unidadbasicaService.getunidadbasicas().subscribe({
        next: (data) => {
         this.unidades.update(currentItems => data);   
          console.log(this.unidades);
        },
        error: (err) => {
          console.error("Error reading unidadbasicaes");
        }

      });
}

async safeCallFamilias() {
  this.familiaService.getfamilias().subscribe({
        next: (data) => {
         this.familias.update(currentItems => data);   
          console.log(this.familias);
        },
        error: (err) => {
          console.error("Error reading familiaes");
        }

      });
}

async safeCallMarcas() {
      this.marcaService.getmarcas().subscribe({
        next: (data) => {
         this.marcas.update(currentItems => data);   
          console.log(this.marcas);
        },
        error: (err) => {
          console.error("Error reading marcaes");
        }

      });

}

async safeCallUbicaciones() {
      this.ubicacionService.getUbicaciones().subscribe({
        next: (data) => {
         this.ubicaciones.update(currentItems => data);   
          console.log(this.ubicaciones);
        },
        error: (err) => {
          console.error("Error reading ubicaciones");
        }

      });

}

}
