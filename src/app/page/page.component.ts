import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DTOCategory} from "../../models/DTOCategory";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-page', templateUrl: './page.component.html', styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public Categories: DTOCategory[] = [];
  public SelectedCategoryID: string = "";
  public SelectedCategoryDescription: string = "";
  public SearchTextValue: any;
  // @ts-ignore
  public currentUserID: number = parseInt(sessionStorage.getItem("userID"));

  constructor(private httpService: HttpClient, private notify:NotificationService) {
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
    // @ts-ignore
    this.currentUserID = sessionStorage.getItem("userID");


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

  deleteEmptyCategory(event: any,categoryName: string) {
    if(confirm("This category will be deleted.")){
      this.httpService.delete( 'http://localhost:5039/api/Category/byname?name=' + categoryName).subscribe((data => {
        if(data){
          this.notify.showSuccess({message:"Category deleted successfully",title:"Success"})
        }
        else{
          this.notify.showError({message:"Cannot delete category.",title:"Fail"})
        }
      }))
    }

    event.stopPropagation();
    window.location.reload();
  }
}
