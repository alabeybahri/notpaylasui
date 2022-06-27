import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = "";
  password: string = "";

  constructor(private httpService: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  onClickButton() {
    this.httpService.post<any>('http://localhost:5039/api/Auth/Register',
      {
        UserName: this.name,
        Password: this.password
      }
    ).subscribe(data => {
      console.log({data});
    });
    this.directToLogin();
  }
  directToLogin() {
    this.router.navigateByUrl("/login").then();
  }
}
