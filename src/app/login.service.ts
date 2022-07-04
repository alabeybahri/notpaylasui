import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userLoggedIn = new BehaviorSubject(sessionStorage.getItem("token")!=null);

  getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  setLoggedIn(val: boolean) {
    this.userLoggedIn.next(val);
  }
  constructor() { }
}








