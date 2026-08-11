import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { BasicModel } from '../models/BasicModel';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';

@Injectable({
    providedIn: 'root'
})
export class FamiliaService {
    headers: HttpHeaders;
    requestOptions: Object;

    private Url = '/api/familia/';
    

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


public register(familia: BasicModel) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.post<any>(`${this.Url}`, familia , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }

public update(familia: BasicModel) {


const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 }),
 withCredentials: true
};

    return this.http.put<any>(`${this.Url}`, familia , httpOptions).pipe(
      tap(res => {
        //localStorage.setItem('token', res.access_token);
        console.log(res);
      })
    );
  }



    public getfamilias(): Observable<BasicModel[]> {
        return this.http.get<BasicModel[]>(this.Url, {});
    }

     public getfamilia(id: string): Observable<BasicModel> {
        return this.http.get<BasicModel>(this.Url + id, {});
    }

     public deletefamilia(id: string): Observable<ResponseData> {
        return this.http.delete<ResponseData>(this.Url + id, {});
    }



}
