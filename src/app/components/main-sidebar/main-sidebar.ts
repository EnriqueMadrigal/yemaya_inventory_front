import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-main-sidebar',
  imports: [RouterLink],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.css',
})
export class MainSidebar implements OnInit{

  currentRole: string = "";

ngOnInit(): void {

  this.currentRole = this.auth.getUserType() ?? "";
  
};


constructor(private auth: AuthService,
 ) {}


}
