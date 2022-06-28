import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public Notes: any[] = [];
  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
    this.httpService.get<any[]>('http://localhost:5039/api/Data/notes').subscribe((data) => {
      if (data) {
        this.Notes = data;
        console.log(data)
      }
    }, error => {
      console.log(error)
    })
  }

}
