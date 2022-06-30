import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  public Rating: number = 0 ;
  private NoteID: number = 0;
  constructor(private httpService:HttpClient) { }

  ngOnInit(): void {
  }

  @Input()
  public set IDNote(value: number) {
    this.NoteID = value;
    console.log(this.NoteID)
  }

  public get IDNote(): number {
    return this.NoteID;
  }

  onClickButton() {
    if(this.Rating!=0){
      this.httpService.post('http://localhost:5039/api/Rating/addrating',
        {
          NoteID: this.NoteID,
          Rating: this.Rating
        }
      ).subscribe(data => {
        console.log({data});
      });
    }
    }

  getRatingVal(rating:number) {
    this.Rating = rating
    console.log(rating)
  }
}
