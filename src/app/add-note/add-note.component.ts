import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DTOCategory} from "../../models/DTOCategory";

@Component({
  selector: 'app-add-note', templateUrl: './add-note.component.html', styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  public Title: string = "";
  public Categories: DTOCategory[] = [];
  public NoteValue: string = "";
  public Category: number = 0;

  constructor(private httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.httpService.get<DTOCategory[]>('http://localhost:5039/api/Category/all').subscribe((data) => {
      if (data) {
        this.Categories = data;
      }
    }, error => {
      console.log(error)
    })


  }


  SubmitForm() {

    this.httpService.post('http://localhost:5039/api/Note/addnote', {
      Title: this.Title,
      NoteValue: this.NoteValue,
      Category: this.Category
    }, {responseType: 'text'}).subscribe((data) => {
      if (data) {
      }
    }, error => {
      console.error(error)
    }, () => {
    });


  }

  public OnCategoryChange($event: any) {
    const data = $event?.target?.value;
    if (data) {
      this.Category = data
    }
  }


}
