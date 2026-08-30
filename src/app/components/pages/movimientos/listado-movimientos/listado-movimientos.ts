import { Component, OnInit , signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Movimiento } from '../../../../models/Movimiento';
import { Entrada } from '../../../../models/Entrada';
import { ResponseData } from '../../../../models/ResponseData';
import { AlertService } from '../../../../services/alertServices'; 
import { MovimientoService } from '../../../../services/movimiento.service';


@Component({
  selector: 'app-listado-movimientos',
  imports: [],
  templateUrl: './listado-movimientos.html',
  styleUrl: './listado-movimientos.css',
})
export class ListadoMovimientos implements OnInit{


movimientos = signal<Entrada[]>([]);

constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movimientoService: MovimientoService,
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
      this.movimientoService.getmovimientos("1").subscribe({
        next: (data) => {
         this.movimientos.update(currentItems => data);   
          console.log(this.movimientos);
        },
        error: (err) => {
          console.error("Error reading movimientos");
        }

      });
}


clickNuevoMovimiento(){
    this.router.navigate(['/addMovimiento']);
}

}
