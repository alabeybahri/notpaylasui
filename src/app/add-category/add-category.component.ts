import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public Name: string = "";
  public Description: string = "";

  constructor(private httpService: HttpClient) {
  }

  ngOnInit(): void {
  }

  SubmitForm() {
    this.httpService.post<boolean>('http://localhost:5039/api/Auth/AddCategory', {
      Name : this.Name,
      Description : this.Description
    }, ).subscribe((data) => {
      if(data){}
    }

    ) }



  }
