import { Component, OnInit , signal } from '@angular/core';
import { EditPaciente } from '../edit-paciente/edit-paciente';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../models/Paciente';
import { PacienteService } from '../../../services/paciente.service';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ResponseData } from '../../../models/ResponseData';
import { AlertService } from '../../../services/alertServices';

@Component({
  selector: 'app-listado-pacientes',
  imports: [RouterLink],
  templateUrl: './listado-pacientes.html',
  styleUrl: './listado-pacientes.css',
})
export class ListadoPacientes implements OnInit{

// pacientes: Paciente [] = [];
pacientes = signal<Paciente[]>([]);



constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private alert: AlertService

){}

ngOnInit(): void {
this.safeCall();
}


async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


clickDelete(id: number) {
 
  console.log("Delete:" + id.toString());
  
  if(confirm("Esta Seguro de eliminar al paciente ?")) {
    this.deletePaciente(id.toString());

    //this.newsService.DeleteGeneralesId(name).subscribe(resp => { 
      
      //this.redirectTo('/noticias');


  //});
}

}

clickPacienteNuevo(){
    this.router.navigate(['/editPaciente/0']);
}


clickCalendar(name: string) {
 
  console.log("calendar:" + name);

}

async safeCall() {
   

      this.pacienteService.getPacientes().subscribe({
        next: (data) => {
           //this.pacientes = [...this.pacientes, data];   
                    this.pacientes.update(currentItems => data);   
          
          console.log(this.pacientes);

        },
        error: (err) => {
          console.error("Error reading pacientes");
        }

      });

    //const data = await firstValueFrom(this.pacienteService.getPacientes()); 

  
}

async deletePaciente(id: string) {
   

      this.pacienteService.deletePaciente(id).subscribe({
        next: (data) => {
            const respuesta : ResponseData = data;
            console.log(respuesta);


         if (!respuesta.error) {
          this.pacientes.update(currentItems => currentItems.filter(paciente => paciente.id !== Number(id)));
          console.log("Eliminado");
         }
         else {
            this.showAlert("No fue posible eliminar al paciente");
         }

        },
        error: (err) => {
          console.error("Error reading pacientes");
        }

      });

    }

redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}



}