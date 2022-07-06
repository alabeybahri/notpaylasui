import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DTONote} from "../../models/DTONote";

@Component({
  selector: 'app-notes', templateUrl: './notes.component.html', styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public Notes: DTONote[] = [];
  public HiddenNotes: DTONote[] = [];
  public _categoryID: string = "";
  public _userID: string = "";
  public searchText: string = "";
  public searchTextHidden: string = "";
  public showHidden: boolean = false;
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
    this.showHidden = false;
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
  public getNotesByCreatorIDHidden(creatorID: string) {
    this.showHidden = true;
    if (creatorID) {
      this.httpService.get<DTONote[]>('http://localhost:5039/api/Note/bycreatorIDHidden?creatorID=' + creatorID)
        .subscribe((data) => {
          if (data) {
            this.HiddenNotes = data;
          }
        }, error => {
          console.log(error)
        });
    }
  }

  OnSearchTextChanged($event: any) {
    this.searchText = $event.target.value;
  }

  OnSearchTextChangedHidden($event: any) {
    this.searchTextHidden = $event.target.value;
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
      this.getNotesByCreatorIDHidden(userID);
    }
  }

}
