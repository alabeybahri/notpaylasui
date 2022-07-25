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
  public SelectedCategoryDescription: string = "";
  public SearchTextValue: any;

  constructor(private httpService: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.httpService.get<DTOCategory[]>('http://localhost:5039/api/Category/all').subscribe((data) => {
      if (data) {
        this.Categories = data;
        this.Categories.sort((a, b) => {
          let fa = a.name.toLowerCase(), fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
    }, error => {
      console.log(error)
    })


  }

  public OnAccordionItemClick(categoryID: string,categoryDescription:string) {
    if (categoryID) {
      this.SelectedCategoryID = categoryID;
      this.SelectedCategoryDescription = categoryDescription;
    }
  }

  public OnSearchTextChanged($event: any) {
    this.SearchTextValue = $event.target.value;
  }
}
