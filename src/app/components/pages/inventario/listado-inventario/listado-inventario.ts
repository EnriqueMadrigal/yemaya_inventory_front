import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Inventario } from '../../../../models/Inventario';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { IventarioService } from '../../../../services/Inventario.service'; 


@Component({
  selector: 'app-listado-inventario',
  imports: [],
  templateUrl: './listado-inventario.html',
  styleUrl: './listado-inventario.css',
})
export class ListadoInventario implements OnInit{

articulos = signal<Inventario[]>([]);

constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inventarioService: IventarioService,
    private alert: AlertService
){}

async showAlert(message: string) {
    await this.alert.error(message, 'Error');
    // Continue flow after it closes
  }


ngOnInit(): void {
this.safeCall();
}  

async safeCall() {
      this.inventarioService.getInventario().subscribe({
        next: (data) => {
         this.articulos.update(currentItems => data);   
          console.log(this.articulos);
        },
        error: (err) => {
          console.error("Error reading Inventario");
        }

      });

}


}
