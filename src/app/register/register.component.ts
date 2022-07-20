import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = "";
  password: string = "";

  constructor(private notify: NotificationService ,private httpService: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  onClickButton() {
    if(this.checkForm()){
      this.httpService.post<any>('http://localhost:5039/api/Auth/Register',
        {
          UserName: this.name,
          Password: this.password
        }
      ).subscribe(data => {
        if(data){
          this.notify.showSuccess({message:"User created successfully", title:"User created"})
          this.directToLogin();
        }
        else{
          this.notify.showError({message:"Username already exists", title:"Register failed"})
        }
      });
    }
    else{
      this.notify.showError({message:"Enter username and password", title:"Register failed"})
    }

  }
  directToLogin() {
    this.router.navigateByUrl("/login").then();
  }
  public checkForm() : boolean{
    return !!(this.name && this.password && this.name.trim());
  }
}
