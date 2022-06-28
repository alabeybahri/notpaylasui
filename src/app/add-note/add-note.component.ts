import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-note', templateUrl: './add-note.component.html', styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  public Title: string = "";
  public Categories: any[] = [];
  public NoteValue: string = "";
  public Category: number = 0;

  constructor(private httpService: HttpClient,private router: Router) {
  }

  ngOnInit(): void {
    this.httpService.get<any[]>('http://localhost:5039/api/Data').subscribe((data) => {
      if (data) {
        this.Categories = data;
        console.log(data)
      }
    }, error => {
      console.log(error)
    })


  }


  SubmitForm() {

    this.httpService.post('http://localhost:5039/api/Auth/AddNote', {
      Title: this.Title, // category: this.category,
      NoteValue: this.NoteValue,
      Category: this.Category
    }, {responseType: 'text'}).subscribe((data) => {
      if (data) {
      }
    }, error => {
      console.error(error)
    }, () => {
      console.log('note add completed');
    });


  }

  public OnCategoryChange($event: any) {
    const data = $event?.target?.value;

    if (data) {
      this.Category = data
    }
  }


}
