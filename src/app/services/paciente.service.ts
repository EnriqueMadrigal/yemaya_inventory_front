import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Paciente } from '../models/Paciente';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';

@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    headers: HttpHeaders;
    requestOptions: Object;

    private PacienteUrl = '/api/paciente/';
    private PacientesUrl = '/api/pacientes/';

    constructor(
        private http: HttpClient) {
            this.headers = new HttpHeaders({
            'accept':'*/*'
        });
        this.requestOptions = {
            headers: this.headers,
            responseType: 'text'
        }
    }


public register(paciente: Paciente) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.post<any>(`${this.PacienteUrl}`, paciente , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }

public update(paciente: Paciente) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.put<any>(`${this.PacienteUrl}`, paciente , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }



    public getPacientes(): Observable<Paciente[]> {
        return this.http.get<Paciente[]>(this.PacientesUrl, {});
    }

     public getPaciente(id: string): Observable<Paciente> {
        return this.http.get<Paciente>(this.PacienteUrl + id, {});
    }

     public deletePaciente(id: string): Observable<ResponseData> {
        return this.http.delete<ResponseData>(this.PacienteUrl + id, {});
    }



}
