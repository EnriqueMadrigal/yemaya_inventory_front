import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';
import { Inventario } from '../models/Inventario';


@Injectable({
    providedIn: 'root'
})
export class IventarioService {
    headers: HttpHeaders;
    requestOptions: Object;

    private Url = '/api/inventario/';
    

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


    public getInventario(): Observable<Inventario[]> {
        return this.http.get<Inventario[]>(this.Url, {});
    }




}
