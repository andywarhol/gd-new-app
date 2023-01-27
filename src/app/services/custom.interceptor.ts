import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}

  //INTERCEPTS HTTP REQUEST AND CHECKS TOKEN  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('accessToken');
    request = request.clone({ headers: request.headers.set('Authorization', 'bearer ' + localToken)})
    return next.handle(request);
  }
}
