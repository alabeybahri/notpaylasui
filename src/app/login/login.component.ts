import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginModel} from "../../models/LoginModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name: string = "";
  password: string = "";
  constructor(private httpService: HttpClient, private router: Router) {

  }


  onClickButton() {
    sessionStorage.clear();
    this.httpService.post<LoginModel>('http://localhost:5039/api/Auth/Login',
      {
        username: this.name,
        password: this.password
      },
      { responseType: 'json' }
    ).subscribe((data) => {
      if (data) {
        sessionStorage.setItem("token",data.token);
        sessionStorage.setItem("userName",data.userName);
        sessionStorage.setItem("userID",data.userID);
        this.directToPage();

      }
    }, error => {
      console.error(error)
    });
  }

  directToRegister() {
    this.router.navigateByUrl("/register").then();
  }
  directToPage() {
    this.router.navigateByUrl("/page").then();
  }
}
