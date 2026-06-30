import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { UserAuthData } from '../models/AuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   //private apiUrl = 'https://dummyjson.com/auth/login';
   private loginUrl = '/api/login';
   private registerUrl = '/api/register';

   

 constructor(private http: HttpClient) {}

 

login(credentials: { email: string; password: string }) {

const body ={
    email: credentials.email,
    password: credentials.password,
    //username: 'test',
    //password: '123456',
    expiresInMins: 30, // optional, defaults to 60
  };

const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.post<UserAuthData>(`${this.loginUrl}`, body , httpOptions).pipe(
      tap(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.user_id.toString());
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('user_type', res.data.user_type.toString());
        console.log(res.data);
      })
    );
  }


register(credentials: { email: string; password: string, fname: string, lastname: string }) {

const body ={
    username: credentials.email,
    password: credentials.password,
    fname: credentials.fname,
    lastname: credentials.lastname,
     };

const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.post<any>(`${this.registerUrl}`, body , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }




 /*
 //login(credentials: any) {
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).subscribe((res: any) => {
      // Store token on success
      localStorage.setItem('token', res.token);
    });
  }
  */
  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

  getUserType(){
    return localStorage.getItem('user_type');
  }

  isLoggedIn() {
    return !!this.getToken();
   }

logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('user_type');
  }

}
