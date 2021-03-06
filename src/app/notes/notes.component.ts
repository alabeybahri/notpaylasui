import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DTONote} from "../../models/DTONote";

@Component({
  selector: 'app-notes', templateUrl: './notes.component.html', styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public Notes: DTONote[] = [];
  public _categoryID: string = "";
  public _userID: string = "";
  public searchText: string = "";
  public search: boolean = true;
  constructor(private httpService: HttpClient) {
  }

  public get CategoryID(): string {
    return this._categoryID;
  }

  @Input()
  public set CategoryID(value: string) {
    this._categoryID = value;
    if (this._categoryID) {
      this.getNotesByCategoryID(this._categoryID);
    }
  }

  public get UserID(): string {
    return this._userID;
  }

  @Input()
  public set UserID(value: string) {
    this._userID = value;
    if (this._userID) {
      this.getNotesByUserID(this._userID);
    }
  }
  ngOnInit(): void {
  }
  public getNotesByCategoryID(categoryID: string) {
    if (categoryID) {
      this.httpService.get<DTONote[]>('http://localhost:5039/api/Note/bycategoryID?categoryID=' + categoryID)
        .subscribe((data) => {
          if (data) {
            this.Notes = data;
          }
        }, error => {
          console.log(error)
        });
    }
  }

  OnSearchTextChanged($event: any) {
    this.searchText = $event.target.value;
  }



  private getNotesByUserID(userID: string) {
    if (userID) {
      this.httpService.get<DTONote[]>('http://localhost:5039/api/Note/bycreatorID?creatorID=' + userID).subscribe((data) =>{
        if(data){
          this.Notes = data;
        }
      }, error => {
        console.log(error)
      });
    }
  }

}
