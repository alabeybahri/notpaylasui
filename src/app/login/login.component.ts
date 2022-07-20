import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginModel} from "../../models/LoginModel";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name: string = "";
  password: string = "";
  constructor(private notify: NotificationService,private httpService: HttpClient, private router: Router) {

  }
  onClickButton() {
    if(this.checkForm()) {
      sessionStorage.clear();
      this.httpService.post<LoginModel>('http://localhost:5039/api/Auth/Login',
        {
          username: this.name,
          password: this.password
        },
        {responseType: 'json'}
      ).subscribe((data) => {
        if (data) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("userName", data.userName);
          sessionStorage.setItem("userID", data.userID);
          this.directToPage();
        }
        else{
          this.notify.showError({message:"Invalid username or password", title:"Login failed"})
        }
      }, error => {
        this.notify.showError({message:"Error Occurred", title:"Login failed"})
      });
    }
    else{
      this.notify.showError({message:"Enter username and password", title:"Login failed"})
    }
  }

  directToRegister() {
    this.router.navigateByUrl("/register").then();
  }
  directToPage() {
    this.router.navigateByUrl("/page").then();
  }
  public checkForm() : boolean{
    return !!(this.name && this.password && this.name.trim());
  }
}
