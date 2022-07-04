import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getAuthStatus(){
    if(sessionStorage.getItem("token")){
      return true;
    }
    return false;
  }
  constructor() { }
}
