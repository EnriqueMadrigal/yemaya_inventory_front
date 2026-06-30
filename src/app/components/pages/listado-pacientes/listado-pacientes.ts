import { Component } from '@angular/core';

@Component({
  selector: 'app-listado-pacientes',
  imports: [],
  templateUrl: './listado-pacientes.html',
  styleUrl: './listado-pacientes.css',
})
export class ListadoPacientes {


clickEdit(name: string) {
 
  console.log("Edit:" + name);
  /*
  if(confirm("Esta Seguro de eliminar esta noticia ?")) {
    
    this.newsService.DeleteGeneralesId(name).subscribe(resp => { 
      //this.messages.push("Upload complete");
      //this.router.navigate(['/noticias']);
      this.redirectTo('/noticias');


  });
}
*/
}

clickCalendar(name: string) {
 
  console.log("calendar:" + name);

}

}