import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-notes', templateUrl: './notes.component.html', styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public Notes: any[] = [];
  private _categoryID: string = "";

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
      this.httpService.get<any[]>('http://localhost:5039/api/Note/bycategoryID?categoryID=' + categoryID)
        .subscribe((data) => {
          if (data) {
            this.Notes = data;
            console.log(data)
          }
        }, error => {
          console.log(error)
        });
    }
  }

}
