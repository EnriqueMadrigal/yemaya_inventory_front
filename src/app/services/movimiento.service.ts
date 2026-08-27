import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Movimiento } from '../models/Movimiento';

import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';

@Injectable({
    providedIn: 'root'
})
export class MovimientoService {
    headers: HttpHeaders;
    requestOptions: Object;

    private Url = '/api/movimiento/';
    

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


public register(movimiento: Movimiento) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.post<any>(`${this.Url}`, movimiento , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }

public update(movimiento: Movimiento) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.put<any>(`${this.Url}`, movimiento , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }



    public getmovimientos(tipo: string): Observable<Movimiento[]> {
        return this.http.get<Movimiento[]>(this.Url + tipo, {});
    }

     public getmovimiento(id: string): Observable<Movimiento> {
        return this.http.get<Movimiento>(this.Url + id, {});
    }

     public deletemovimiento(id: string): Observable<ResponseData> {
        return this.http.delete<ResponseData>(this.Url + id, {});
    }



}
