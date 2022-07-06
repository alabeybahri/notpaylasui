import {Component, OnInit} from '@angular/core';
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
  public date: string = "";
  // @ts-ignore
  public currentUserID: string = sessionStorage.getItem("userID");

  constructor(private route: ActivatedRoute, private httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNoteByID(params['id']);
    });
    // @ts-ignore
    this.currentUserID = sessionStorage.getItem("userID");
  }


  public getNoteByID(ID: string) {
    if (ID) {
      this.httpService.get<NoteProfile>('http://localhost:5039/api/Note/byID?ID=' + ID)
        .subscribe((data) => {
          if (data) {
            this.note = data;
            this.removeSeconds();
            // @ts-ignore
            this.note.fileValue = this.note.fileValue?.replace("data:application/pdf;base64,","");
          }
        }, error => {
          console.log(error)
        });
    }
  }


  public removeSeconds() {
    this.date = this.note.createdAt.replace(/T/, " ").replace(/:\b(\d)+.\b(\d)+$/, "");
  }

  inactivateNote() {
    let ID = this.note.id;
    this.httpService.delete('http://localhost:5039/api/Note/inactiveByID?ID=' + ID).subscribe();
  }
}


