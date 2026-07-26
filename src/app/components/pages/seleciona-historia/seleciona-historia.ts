import { Component, OnInit, inject ,input, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alertServices';
import { Paciente } from '../../../models/Paciente';
import { PacienteService } from '../../../services/paciente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth';
import { User } from '../../../models/User';
import { firstValueFrom } from 'rxjs';
import { ResponseData } from '../../../models/ResponseData';
import { ComponentsTextService } from '../../../services/componentsText.service';
import { ComponentsText } from '../../../models/ComponentsText';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-seleciona-historia',
  imports: [RouterLink],
  templateUrl: './seleciona-historia.html',
  styleUrl: './seleciona-historia.css',
})
export class SelecionaHistoria implements OnInit{

  userId =  "";
  currentUser :any;

  constructor(private router: Router,
      private alerts: AlertService,
      private fb: FormBuilder, 
      private pacienteService: PacienteService,
      private componentsTextService : ComponentsTextService,
      private auth: AuthService,
      private route: ActivatedRoute ) {
   
     }

  


ngOnInit(): void {
this.userId = this.auth.getUserId() ?? "0";
     const id = this.route.snapshot.paramMap.get('id') ?? "";

if (id != "0") {
      this.safeCall(id);
    }


}


async safeCall(id: string) {
   

      this.pacienteService.getPaciente(id).subscribe({
        next: (data) => {
           //this.pacientes = [...this.pacientes, data];   
                    this.currentUser = data;
                    console.log(data);

        },
        error: (err) => {
          console.error("Error reading pacientes");
        }

      });

  
}



}
