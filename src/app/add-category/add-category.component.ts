import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public Name: string = "";
  public Description: string = "";

  constructor(private notify: NotificationService,private httpService: HttpClient) {
  }

  ngOnInit(): void {
  }

  SubmitForm() {
    if(this.checkForm()){
      this.httpService.post<boolean>('http://localhost:5039/api/Category/create', {
        Name : this.Name.trim(),
        Description : this.Description.trim()
      }, ).subscribe((data) => {
          if(data){
            this.notify.showSuccess({message:"Category created successfully", title:"Success"})
          }
          else{
            this.notify.showError({message:"This category already exists", title:"Category Create Failed"})
          }
        })
    }
    else{
      this.notify.showError({message:"Name and Description needed", title:"Category Create Failed"})
    }
    }

  public checkForm() : boolean{
    return !!(this.Name && this.Description && this.Name.trim() && this.Description.trim());
  }

  }
