import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {


  constructor(private httpService: HttpClient) {
  }

  ngOnInit(): void {


  }

  customRequest() {
    this.httpService.get<any>('http://localhost:5039/api/Data',
      {}
    ).subscribe(data => {
      console.log({data});
    });

  }


  denemeRequest() {
    this.httpService.get('http://localhost:5039/api/Auth/deneme',
      {responseType: 'text' }
    ).subscribe(data => {
      console.log({data});
    });

  }
}
