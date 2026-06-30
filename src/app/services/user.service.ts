import { Injectable } from '@angular/core';
import { User } from "../models/User";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    headers: HttpHeaders;
    requestOptions: Object;

    private UserUrl = '/api/user/';

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

    public getUserByID(id: string): Observable<User> {
        return this.http.get<User>(this.UserUrl + id, {});
    }


}
