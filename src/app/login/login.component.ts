import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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
    this.httpService.post('http://localhost:5039/api/Auth/Login',
      {
        username: this.name,
        password: this.password
      },
      { responseType: 'text' }
    ).subscribe((data) => {
      if (data) {
        sessionStorage.setItem('token', data);
        sessionStorage.setItem('userName',this.name);
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
