import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http';


import { AlertService } from '../../services/alertServices';



@Component({
  selector: 'app-register',
   standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})


export class Register{

 email = '';
  password = '';
  fname = '';
  lastname = '';

 constructor(
  private auth: AuthService, 
  private router: Router,
  private alerts: AlertService) {}
 
 // Define the form group
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    checkTerminos: new FormControl(false, [Validators.requiredTrue])
  });

private modalInstance: any;

  openModal() {
   


  }

  closeModal() {

  }



onSubmit() {
 
    if (this.userForm.valid) {
      if (this.userForm.value.email) {
        this.email = this.userForm.value.email;
      }
      if (this.userForm.value.password) {
        this.password = this.userForm.value.password;
      }
      if (this.userForm.value.fname) {
        this.fname = this.userForm.value.fname;
      }

      if (this.userForm.value.lastname) {
        this.lastname = this.userForm.value.lastname;
      }
      
      console.log('Form Submitted!', this.email, this.password);
      this.auth.register({email: this.email, password: this.password, fname: this.fname, lastname: this.lastname})
      .subscribe({
        
        next: (response) => {
        console.log('Success!', response);
        console.log(response);
       

          if (response == "0") {
            console.log("Show modal");
            this.showAlert();


            //this.alertService.error('Usuario registrado anteriormente', { keepAfterRouteChange: true });
          
          }

          else {

        this.router.navigate(['/dashboard']);
        console.log("return");


          }

           


      },
      error: (error: HttpErrorResponse) => {
        console.error('Status code:', error.status); // e.g., 404, 500
        console.error('Error message:', error.message);
        console.error('Server error payload:', error.error); // Contains the backend response body
      }

    });



    }
  }

async showAlert() {
    this.alerts.error('Usuario registrado anteriormente', 'OK');
    //await this.alerts.success('Saved successfully.', 'Done', 2000);
    // Continue flow after it closes
  }


}
