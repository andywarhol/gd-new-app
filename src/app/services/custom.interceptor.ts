import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


const TOKEN_HEADER_KEY = 'x-access-token'

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  //INTERCEPTS HTTP REQUEST AND CHECKS TOKEN  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.token.getToken();
    if(token != null){
      authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
    /*
    debugger
    const localToken = localStorage.getItem('accessToken');
    request = request.clone({ headers: request.headers.set('Authorization', 'bearer ' + localToken)})
    */
    return next.handle(authReq);
  }
}

export const customInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true}
];
