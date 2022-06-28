import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {


  constructor(private httpService: HttpClient,private router: Router) {
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

  directToAddNote() {
    this.router.navigateByUrl("/addnote").then();
  }

  directToAddCategory() {
    this.router.navigateByUrl("/addcategory").then();
  }
}
