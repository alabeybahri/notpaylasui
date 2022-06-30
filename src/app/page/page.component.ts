import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DTOCategory} from "../../models/DTOCategory";

@Component({
  selector: 'app-page', templateUrl: './page.component.html', styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public Categories: DTOCategory[] = [];
  public SelectedCategoryID: string = "";
  public SearchTextValue: any;

  constructor(private httpService: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.httpService.get<DTOCategory[]>('http://localhost:5039/api/Category/all').subscribe((data) => {
      if (data) {
        this.Categories = data;
        console.log(data)
      }
    }, error => {
      console.log(error)
    })


  }


  customRequest() {
    this.httpService.get<any>('http://localhost:5039/api/Data', {}).subscribe(data => {
      console.log({data});
    });

  }

  directToAddNote() {
    this.router.navigateByUrl("/addnote").then();
  }

  directToAddCategory() {
    this.router.navigateByUrl("/addcategory").then();
  }

  public OnAccordionItemClick(categoryID: string) {
    if (categoryID) {
      this.SelectedCategoryID = categoryID;
    }
  }

  public OnSearchTextChanged($event: any) {
    this.SearchTextValue = $event.target.value;
    console.log(this.SearchTextValue);
  }
}
