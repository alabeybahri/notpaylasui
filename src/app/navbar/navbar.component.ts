import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userName : string | null = sessionStorage.getItem("userName");
  private setLoggedOut(value: boolean): void {this.loginService.setLoggedIn(value);}
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName")
  }

  LogoutEvent() {
    this.setLoggedOut(false);
    sessionStorage.clear();
  }

}
