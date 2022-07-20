import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DTOCategory} from "../../models/DTOCategory";
import {NoteSend} from "../../models/NoteSend";
import {NotificationService} from "../notification.service";


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

  constructor(private notify: NotificationService,private httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.httpService.get<DTOCategory[]>('http://localhost:5039/api/Category/all').subscribe((data) => {
      if (data) {
        this.Categories = data;
      }
      else{
      }
    }, error => {
      console.log(error)
    })


  }
  SubmitForm() {
    if(this.checkForm()){
      let requestedNote: NoteSend = {
        title: this.Title.trim(),
        category: this.Category.toString(),
        noteValue: this.NoteValue.trim(),
        fileValue: this.FileValue,
        fileType: this.FileType
      };
      this.httpService.post('http://localhost:5039/api/Note/addnote', requestedNote ,{responseType:"text"}).subscribe((data) => {
        if (data=="true") {
          this.notify.showSuccess({message:"Note created successfully", title:"Success"})
        }
        else{
          this.notify.showError({message:"Select a category", title:"Error"})
        }
      }, error => {
        console.error(error)
      }, () => {
      });
    }
    else{
      this.notify.showError({message:"Title and Description needed", title:"Error"})
    }
  }

  public OnCategoryChange($event: any) {
    const data = $event?.target?.value;
    if (data) {
      this.Category = data
    }
  }

  public checkForm() : boolean{
    return !!(this.NoteValue && this.Title && this.NoteValue.trim() && this.Title.trim());
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
    let filesSelected = document.getElementById("custom-file-input").files;
    let originalFile = filesSelected[0];
    this.FileType = originalFile.type
    let reader = new FileReader();
    reader.readAsDataURL(originalFile);
    reader.onload = () => {
      let json = JSON.stringify({dataURL: reader.result});
      this.FileValue = JSON.parse(json).dataURL;
      console.log(this.FileValue);
    };
  }
}
