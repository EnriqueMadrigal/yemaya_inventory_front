import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasicModel } from '../../../../models/BasicModel';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { MarcaService } from '../../../../services/marca.service';


@Component({
  selector: 'app-listado-marca',
   imports: [RouterLink],
  templateUrl: './listado-marcas.html',
  styleUrl: './listado-marcas.css',
})
export class Listadomarca implements OnInit{

marcas = signal<BasicModel[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
}  

clickmarcaNueva(){
    this.router.navigate(['/editMarca/0']);
}


async safeCall() {
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

