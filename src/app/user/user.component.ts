import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // @ts-ignore
  public userID : string = sessionStorage.getItem("userID");
  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.userID = sessionStorage.getItem("userID");
  }


}
