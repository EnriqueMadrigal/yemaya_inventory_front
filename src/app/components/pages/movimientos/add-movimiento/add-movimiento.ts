import { Component, OnInit , signal , computed} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../../../models/Articulo';
import { BasicModel } from '../../../../models/BasicModel';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { ArticuloService } from '../../../../services/articulo.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Movimiento } from '../../../../models/Movimiento';
import { UnidadService } from '../../../../services/unidad.service';
import { Unidad } from '../../../../models/Unidad';
import { MovimientoService } from '../../../../services/movimiento.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-add-movimiento',
  imports: [ReactiveFormsModule],
  templateUrl: './add-movimiento.html',
  styleUrl: './add-movimiento.css',
})
export class AddMovimiento implements OnInit{

articulos = signal<Articulo[]>([]);
unidades = signal<Unidad[]>([]);

arts = computed<BasicModel[]>(() =>
  this.articulos().map(articulo => ({
    id: articulo.id,
    nombre: articulo.nombre_producto
  }))
);


dataForm!: FormGroup;
 isLoading = false;
currentData: Movimiento = {
  id: 0,
  id_articulo: 1,
  id_medida: 1,
  cantidad: 0,
  tipo: 1,
  updated_by: 0,
  observaciones: ""
}




constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private unidadService: UnidadService,
    private movimientoService: MovimientoService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
this.safeCallUnidades();
this.initForm();
}  

async safeCall() {
      this.articuloService.getarticulos().subscribe({
        next: (data) => {
           this.articulos.update(currentItems => data);   
          console.log(this.articulos);
        },    
        error: (err) => {
          console.error("Error reading articuloes");
        }

      });

}



initForm(): void {
  // Inicialización del FormGroup con los valores de currentUser

this.dataForm = new FormGroup({
      id: new FormControl(this.currentData.id),
      id_articulo: new FormControl(this.currentData.id_articulo),
      id_medida: new FormControl(this.currentData.id_medida),
      tipo:  new FormControl(this.currentData.tipo),
      cantidad: new FormControl(0),
      observaciones: new FormControl(this.currentData.observaciones),
      updated_by: new FormControl(0)
    });
  }


onSubmit(): void {
    if (this.dataForm.valid) {
      const datos: Movimiento = this.dataForm.value;
      this.isLoading = true;
      console.log('Datos a enviar:', datos);
      // Aquí llamarías a tu servicio para guardar en la DB
          //Registro de nuevos datos
         this.RegisterNew(datos);

    } else {
      Object.values(this.dataForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

clickCancel(){
    this.router.navigate(['/listadoMovimientos']);
}



async safeCallUnidades() {
  console.log("obteniendo");
      this.unidadService.getunidades().subscribe({
        next: (data) => {
         this.unidades.update(currentItems => data);   
          console.log(this.unidades);
        },
        error: (err) => {
          console.error("Error reading unidadbasicaes");
        }

      });
}


private RegisterNew(datos :Movimiento) {

    this.movimientoService.register(datos)
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



}
