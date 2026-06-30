import { Component,  OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs'; // 1. Import the helper function


@Component({
  selector: 'app-main-header',
  imports: [],
  templateUrl: './main-header.html',
  styleUrl: './main-header.css',
})
export class MainHeader implements OnInit {

  authService: any;
  curUser!: User;
  userId =  "";
  userName:  string = "";

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,) {
    this.authService = auth;
  }


ngOnInit(): void {

this.safeCall();
    };

 onButtonLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

async safeCall() {
  try {
    // EMPTY completes immediately without emitting anything
    this.userId = this.auth.getUserId() ?? "0";

    const data = await firstValueFrom(this.userService.getUserByID(this.userId)); 
    this.curUser = data;
    console.log(data);
    this.userName = data.first_name + " " + data.last_name;
  } catch (error) {
    console.log('Stream completed empty!'); // Handle the RxJS EmptyError here
  }
}



}
