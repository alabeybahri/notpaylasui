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

  constructor(private route: ActivatedRoute, private httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNoteByID(params['id']);
    });
  }

  public createPDF(){
    // let pdf_newTab = window.open("");
    // if (typeof this.note.fileValue === "string") {
    //   pdf_newTab?.document.write(
    //     "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
    //     encodeURI(this.note.fileValue) + "'></iframe>"
    //   )
    // }
    // const linkSource = "data:application/pdf;base64," + this.note.fileValue;
    // const downloadLink = document.createElement("a");
    // const fileName = "sample.pdf"
    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;

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
            this.createPDF();
          }
        }, error => {
          console.log(error)
        });
    }
  }


  public removeSeconds() {
    this.date = this.note.createdAt.replace(/T/, " ").replace(/:\b(\d)+.\b(\d)+$/, "");
  }
}


