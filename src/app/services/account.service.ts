import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService{
    constructor(private http: HttpClient){}

    onLogin(obj : any) : Observable<any> {
        return this.http.post('http://localhost:3000/auth/signin', obj)
    }

    get
}