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
  public Base64String: string | undefined;
  public FileType: string | undefined;

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
    console.log(this.Base64String);
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


  encodeImageFileAsURL() {
    if(document){
    // @ts-ignore
      let filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      let fileToLoad = filesSelected[0];
      this.FileType = fileToLoad.type;
      let fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        // @ts-ignore
        let srcData = fileLoadedEvent.target.result; // <--- data: base64

        let newImage = document.createElement('img');
        if (typeof srcData === "string") {
          newImage.src = srcData;
        }
        // @ts-ignore
        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        // @ts-ignore
        alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        // @ts-ignore
        console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
    }
    }
}
