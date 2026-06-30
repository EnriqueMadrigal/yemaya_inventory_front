import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from './components/main-header/main-header';
import { MainFooter } from './components/main-footer/main-footer';
import { MainSidebar } from './components/main-sidebar/main-sidebar';
import { AuthService } from './services/auth';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeader, MainFooter, MainSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('expimed');
authService: any;

  constructor(auth: AuthService) {
    this.authService = auth;
  }
}
