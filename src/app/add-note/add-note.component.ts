import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DTOCategory} from "../../models/DTOCategory";
import {NoteSend} from "../../models/NoteSend";


@Component({
  selector: 'app-add-note', templateUrl: './add-note.component.html', styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  public Title: string = "";
  public Categories: DTOCategory[] = [];
  public NoteValue: string = "";
  public Category: number = 0;
  public FileValue: string = "";
  public FileType: string = "";

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

    let requestedNote: NoteSend = {
      title: this.Title,
      category: this.Category.toString(),
      noteValue: this.NoteValue,
      fileValue: this.FileValue,
      fileType: this.FileType
    };
    this.httpService.post('http://localhost:5039/api/Note/addnote', requestedNote ,{responseType:"text"}).subscribe((data) => {
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
    if (document) {
      // @ts-ignore
      let filesSelected = document.getElementById("inputFileToLoad").files;
      if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];
        this.FileType = fileToLoad.type;
        let fileReader = new FileReader();
        fileReader.onload = () => {
          let json = JSON.stringify({dataURL: fileReader.result});
          let base64 = JSON.parse(json).dataURL;
          let newImage = document.createElement('img');
          newImage.src = base64;
          // @ts-ignore
          document.getElementById("imgTest").innerHTML = newImage.outerHTML;
          // @ts-ignore
          this.FileValue = base64
        }
        fileReader.readAsDataURL(fileToLoad);

      }
    }
  }

  onUpload() {
    // @ts-ignore
    let filesSelected = document.getElementById("file-input").files;
    let originalFile = filesSelected[0];
    this.FileType = originalFile.type
    let reader = new FileReader();
    reader.readAsDataURL(originalFile);
    reader.onload = () => {
      let json = JSON.stringify({dataURL: reader.result});
      this.FileValue = JSON.parse(json).dataURL;
    };
  }
}
