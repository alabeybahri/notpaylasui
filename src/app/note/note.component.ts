import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NoteProfile} from "../../models/NoteProfile";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public note = {} as NoteProfile;
  public date: string = "";
  public Base64PDF: string = "";
  public HrefDOCX: string = "";
  // @ts-ignore
  public currentUserID: number = parseInt(sessionStorage.getItem("userID"));

  constructor(private notify: NotificationService, private route: ActivatedRoute, private httpService: HttpClient,private router:Router) {
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNoteByID(params['id']);
    });
    // @ts-ignore
    this.currentUserID = sessionStorage.getItem("userID");
  }

  public createDOCX(){
    const linkSource = this.note.fileValue;
    const downloadLink = document.createElement("a");
    const fileName = "sample.docx"
    if (typeof linkSource === "string") {
      downloadLink.href = linkSource;
    }
    downloadLink.download = fileName;
    downloadLink.click();
  }


  public getNoteByID(ID: string) {
    if (ID) {
      this.httpService.get<NoteProfile>('http://localhost:5039/api/Note/byID?ID=' + ID)
        .subscribe((data) => {
          if (data) {
            this.note = data;
            this.removeSeconds();
            this.trimFileValue();
          }
        }, error => {
          console.log(error)
        });
    }
  }

  trimFileValue(){
    if(this.note.fileValue?.includes("data:application/octet-stream;base64,")){
      this.HrefDOCX = this.note.fileValue?.replace("data:application/octet-stream;base64,","");
    }
    if(this.note.fileValue?.includes("data:application/pdf;base64,")){
      // @ts-ignore
      this.Base64PDF = this.note.fileValue?.replace("data:application/pdf;base64,","");
    }
  }

  public removeSeconds() {
    this.date = this.note.createdAt.replace(/T/, " ").replace(/:\b(\d)+.\b(\d)+$/, "");
  }

  deleteNote() {
    if(confirm("Note will be deleted")){
      let ID = this.note.id;
      this.httpService.delete('http://localhost:5039/api/Note/ByID?ID=' + ID).subscribe();
      this.notify.showSuccess({title:"Success", message:"Note Deleted"})
      this.router.navigateByUrl("/page").then();
    }

    }

}


