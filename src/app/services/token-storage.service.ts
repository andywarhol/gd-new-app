import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void{
    window.localStorage.clear();
  }
  //cambiar por local storage
  /*
  public saveToken(token : string) : void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user) : void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));

  }
*/
  public getToken() : string{
    return localStorage.getItem('token')
  }

  public getName(): string {
    return localStorage.getItem('firstName');
  }


}
