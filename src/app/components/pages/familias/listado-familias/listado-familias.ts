import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasicModel } from '../../../../models/BasicModel';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { FamiliaService } from '../../../../services/familia.service';


@Component({
  selector: 'app-listado-familia',
   imports: [RouterLink],
  templateUrl: './listado-familias.html',
  styleUrl: './listado-familias.css',
})
export class Listadofamilia implements OnInit{

familias = signal<BasicModel[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private familiaService: FamiliaService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
}  

clickfamiliaNueva(){
    this.router.navigate(['/editFamilia/0']);
}


async safeCall() {
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

