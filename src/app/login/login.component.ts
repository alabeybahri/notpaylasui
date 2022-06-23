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
    // this.httpService.get('http://localhost:5039/api/Login').subscribe(data => {
    //   console.log({data});
    // });
    // this.httpService.post<any>('http://localhost:5039/api/Login?data=' + this.name, undefined).subscribe(data => {
    //   console.log({data});
    // });
    this.httpService.post('http://localhost:5039/api/Auth/Login',
      {
        UserName: this.name,
        Password: this.password
      },
      { responseType: 'text' }
    ).subscribe((data) => {
      if (data) {
        sessionStorage.setItem('token', data);
        this.directToPage();

      }
    }, error => {
      console.error(error)
    }, () => {
      console.log('login completed');
    });
  }

  directToRegister() {
    this.router.navigateByUrl("/register").then();
  }
  directToPage() {
    this.router.navigateByUrl("/page").then();
  }
}
