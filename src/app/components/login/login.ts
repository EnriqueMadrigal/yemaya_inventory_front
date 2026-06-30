import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../services/alertServices';



declare var $: any; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router,private alerts: AlertService) {}

// Define the form group
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

onSubmit() {
  
    if (this.userForm.valid) {
      if (this.userForm.value.email) {
        this.email = this.userForm.value.email;
      }
      if (this.userForm.value.password) {
        this.password = this.userForm.value.password;
      }

      
      console.log('Form Submitted!', this.email, this.password);
      this.auth.login({email: this.email, password: this.password})
     .subscribe({
        next: (data) => {
        console.log('Success payload:', data);
        this.router.navigate(['/dashboard']);
  },
  error: (error: HttpErrorResponse) => {
    if (error.status === 401) {
      this.showAlert('Correo invalido o contraseña invalida');
      console.error('Unauthorized! Token might be expired.');
      // Add your logout or redirection logic here
    } else {
      console.error(`Other error occurred: ${error.status}`);
      this.showAlert(`Other error occurred: ${error.status}`);
    }
  }
});



     /*
      .subscribe(() => {
        //this.openModal();
        this.router.navigate(['/dashboard']);
        console.log("return");
      });
  */

    }
  }


async showAlert(message: string) {
    await this.alerts.error(message, 'OK');
    // Continue flow after it closes
  }


 openModal() {
    // Select the modal by its HTML ID and show it
    $('#myModal').modal('show'); 
  }

  closeModal() {
    // Select the modal by its HTML ID and hide it
    $('#myModal').modal('hide'); 
  }


}
