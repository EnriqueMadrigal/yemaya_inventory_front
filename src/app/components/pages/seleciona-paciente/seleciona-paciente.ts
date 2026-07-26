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
  selector: 'app-seleciona-paciente',
  imports: [RouterLink],
  templateUrl: './seleciona-paciente.html',
  styleUrl: './seleciona-paciente.css',
})
export class SelecionaPaciente implements OnInit{

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

redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}


}
