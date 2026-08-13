import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';

@Injectable({
    providedIn: 'root'
})
export class ArticuloService {
    headers: HttpHeaders;
    requestOptions: Object;

    private Url = '/api/articulo/';
    

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


public register(articulo: Articulo) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.post<any>(`${this.Url}`, articulo , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }

public update(articulo: Articulo) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.put<any>(`${this.Url}`, articulo , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }



    public getarticulos(): Observable<Articulo[]> {
        return this.http.get<Articulo[]>(this.Url, {});
    }

     public getarticulo(id: string): Observable<Articulo> {
        return this.http.get<Articulo>(this.Url + id, {});
    }

     public deletearticulo(id: string): Observable<ResponseData> {
        return this.http.delete<ResponseData>(this.Url + id, {});
    }



}
