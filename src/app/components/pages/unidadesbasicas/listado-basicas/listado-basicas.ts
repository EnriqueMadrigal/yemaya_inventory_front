import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasicModel } from '../../../../models/BasicModel';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { UnidadbasicaService } from '../../../../services/unidadbasica.service';


@Component({
  selector: 'app-listado-unidadbasica',
   imports: [RouterLink],
  templateUrl: './listado-basicas.html',
  styleUrl: './listado-basicas.css',
})
export class Listadounidadbasica implements OnInit{

unidadbasicas = signal<BasicModel[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unidadbasicaService: UnidadbasicaService,
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
    this.router.navigate(['/editUnidadbasica/0']);
}


async safeCall() {
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

