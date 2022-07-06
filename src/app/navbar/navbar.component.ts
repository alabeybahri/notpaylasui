import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userName : string | null = sessionStorage.getItem("userName");
  public userID : string | null = sessionStorage.getItem("userID");
  constructor() { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName");
    this.userID = sessionStorage.getItem("userID");
  }

  LogoutEvent() {
    sessionStorage.clear();
  }

}
