import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Unidad } from '../../../../models/Unidad';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { UnidadService } from '../../../../services/unidad.service';


@Component({
  selector: 'app-listado-unidadbasica',
   imports: [RouterLink],
  templateUrl: './listado-unidades.html',
  styleUrl: './listado-unidades.css',
})
export class Listadounidades implements OnInit{

unidades = signal<Unidad[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unidadeservice: UnidadService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
}  

clickunidadbasicaNueva(){
    this.router.navigate(['/editUnidad/0']);
}


async safeCall() {
  console.log("obteniendo");
      this.unidadeservice.getunidades().subscribe({
        next: (data) => {
         this.unidades.update(currentItems => data);   
          console.log(this.unidades);
        },
        error: (err) => {
          console.error("Error reading unidadbasicaes");
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

