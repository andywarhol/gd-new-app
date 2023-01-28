import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}


@Injectable({
    providedIn: 'root'
})
export class AccountService{



    constructor(private http: HttpClient){}

    onLogin(obj : any) : Observable<any> {
        return this.http.post('http://localhost:3000/auth/signin',obj)
    }

    addProduct(obj : any) : Observable<any>{
        debugger
        return this.http.post('http://localhost:3000/products/new',{obj}, httpOptions)
    }

    getAllProducts() : Observable<any>{
        return this.http.get('http://localhost:3000/products/new');
    }
    
}