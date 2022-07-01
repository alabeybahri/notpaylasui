import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userName : string = ""
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  LogoutEvent() {
    sessionStorage.clear()
    // this.directToLoginPage()
  }

  directToLoginPage(){
    this.router.navigateByUrl("/#").then();
  }
}
