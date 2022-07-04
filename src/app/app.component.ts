import { Component } from '@angular/core';
import {LoginService} from "./login.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private loginService: LoginService) {
    this.subscription = this.loginService.getLoggedIn().subscribe(value => {
      this.userLoggedIn = value;
      console.log(value)
    });
    console.log("is user logged in ? =>",this.userLoggedIn)
  }

  public userLoggedIn: boolean | undefined ;
  private subscription: Subscription | undefined;

  ngOnInit(): void {}


  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
