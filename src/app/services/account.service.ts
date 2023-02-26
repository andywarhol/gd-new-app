import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";
import { QueryProducts } from "src/interfaces/query-products.interface";
import { Returned } from "../exit-details/exit-details.component";
import { Pagination } from "src/interfaces/pagination.interface";

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
        return this.http.post('http://localhost:3000/products/new',obj)
    }

    addExit(obj : any) : Observable<any>{
        return this.http.post('http://localhost:3000/exits/new',obj)
    }

    getAllProducts() : Observable<any>{
        return this.http.get('http://localhost:3000/products');
    }
   
    getAllExits() : Observable<any>{
        return this.http.get('http://localhost:3000/exits');
    }

    getExitKey(): Observable<any>{
        return this.http.get('http://localhost:3000/exits/new/keygen');
    }

    getWarehouses(): Observable<any>{
        return this.http.get('http://localhost:3000/warehouses');
    }

    searchProducts(query : QueryProducts): Observable<any>{
        return this.http.get(`http://localhost:3000/products?${query.field}=${query.search}`);
    }

    productsPaginate(query : Pagination): Observable<any>{
        return this.http.get(`http://localhost:3000/products/paginate?pages=${query.pages}&productsPerPage=${query.productsPerPage}`);
    }

    updateProductQuantity(obj : any) : Observable<any>{
        const{id, quantity} = obj;
        return this.http.patch(`http://localhost:3000/products/${id}/quantity`, {quantity});
    }

    updateExitReturned(obj: Returned) : Observable<any> {
        const{id, productId, returned} = obj;
        return this.http.patch(`http://localhost:3000/exits/${id}/return`, {productId, returned});
    }
}