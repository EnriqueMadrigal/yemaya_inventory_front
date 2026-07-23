import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { ComponentsText } from '../models/ComponentsText';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/ResponseData';

@Injectable({
    providedIn: 'root'
})
export class ComponentsTextService {
    headers: HttpHeaders;
    requestOptions: Object;

    private ComponensTextUrl = '/api/componentsText/';
    

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


     public getComponents(id: string): Observable<ComponentsText[]> {
        return this.http.get<ComponentsText[]>(this.ComponensTextUrl + id, {});
    }
}

