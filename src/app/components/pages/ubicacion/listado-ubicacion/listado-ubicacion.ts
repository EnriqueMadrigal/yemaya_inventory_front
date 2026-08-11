import { Component, OnInit , signal } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasicModel } from '../../../../models/BasicModel';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { UbicacionService } from '../../../../services/ubicacion.service';


@Component({
  selector: 'app-listado-ubicacion',
   imports: [RouterLink],
  templateUrl: './listado-ubicacion.html',
  styleUrl: './listado-ubicacion.css',
})
export class ListadoUbicacion implements OnInit{

ubicaciones = signal<BasicModel[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ubicacionService: UbicacionService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
}  

clickUbicacionNueva(){
    this.router.navigate(['/editUbicacion/0']);
}


async safeCall() {
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


clickDelete(id: number) {
 
  console.log("Delete:" + id.toString());
  
  if(confirm("Esta Seguro de eliminar esta ubicación ?")) {
    //this.deletePaciente(id.toString());

    //this.newsService.DeleteGeneralesId(name).subscribe(resp => { 
      
      //this.redirectTo('/noticias');


  //});
}
}

}

