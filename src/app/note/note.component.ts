import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NoteProfile} from "../../models/NoteProfile";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public note = {} as NoteProfile;
  public date : string = "";
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
            this.removeSeconds();
            console.log(this.date);
          }
        }, error => {
          console.log(error)
        });
    }
  }

  public removeSeconds(){

    this.date = this.note.createdAt.replace(/T/, " ").replace(/:\b(\d\d)\b.\b(\d\d\d)\b/, "");
  }

  }


