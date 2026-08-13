import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Articulo } from '../../../../models/Articulo';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { ArticuloService } from '../../../../services/articulo.service';


@Component({
  selector: 'app-listado-articulo',
   imports: [RouterLink],
  templateUrl: './listado-articulos.html',
  styleUrl: './listado-articulos.css',
})
export class ListadoArticulos implements OnInit{

articulos = signal<Articulo[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
}  

clickarticuloNueva(){
    this.router.navigate(['/editArticulo/0']);
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

