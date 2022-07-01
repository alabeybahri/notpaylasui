import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NoteProfile} from "../../models/NoteProfile";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public note = {} as NoteProfile;
  constructor(private route:ActivatedRoute,private httpService:HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNoteByID(params['id'])
    });
  }


  public getNoteByID(ID: string) {
    if (ID) {
      this.httpService.get<NoteProfile>('http://localhost:5039/api/Note/byID?ID=' + ID)
        .subscribe((data) => {
          if (data) {
            this.note = data;
          }
        }, error => {
          console.log(error)
        });
    }
  }
  }


