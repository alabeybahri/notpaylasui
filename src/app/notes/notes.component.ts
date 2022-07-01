import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DTONote} from "../../models/DTONote";

@Component({
  selector: 'app-notes', templateUrl: './notes.component.html', styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public Notes: DTONote[] = [];
  public _categoryID: string = "";
  public searchText: string = "";
  constructor(private httpService: HttpClient) {
  }

  @Input()
  public set CategoryID(value: string) {
    this._categoryID = value;

    if (this._categoryID) {
      this.getNotesByCategoryID(this._categoryID);
    }
  }

  public get CategoryID(): string {
    return this._categoryID;
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
    console.log(this.searchText)
  }
}
