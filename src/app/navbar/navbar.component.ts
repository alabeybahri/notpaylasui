import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userName : string | null = sessionStorage.getItem("userName");
  constructor() { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName")
  }

  LogoutEvent() {
    sessionStorage.clear();
  }

}
