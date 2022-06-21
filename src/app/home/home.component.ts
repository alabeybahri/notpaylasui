import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string = "";
  password: string = "";

  constructor(private httpService: HttpClient) {

  }

  ngOnInit(): void {
  }

  onClickButton() {
    // this.httpService.get('http://localhost:5039/api/Login').subscribe(data => {
    //   console.log({data});
    // });
    // this.httpService.post<any>('http://localhost:5039/api/Login?data=' + this.name, undefined).subscribe(data => {
    //   console.log({data});
    // });
    this.httpService.post<any>('http://localhost:5039/api/Login',
      {
        UserName: this.name,
        Password: this.password
      }
    ).subscribe(data => {
      console.log({data});
    });
  }
}
