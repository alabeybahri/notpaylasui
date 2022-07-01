import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-rating', templateUrl: './add-rating.component.html', styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  public Rating: number = 0;
  public NoteID: number = 0;
  public DBRating: number = 0;
  public DBRatingAverage: number = 0;
  constructor(private httpService: HttpClient) {
  }

  public get IDNote(): number {
    return this.NoteID;
  }

  @Input()
  public set IDNote(value: number) {
    this.NoteID = value;
    if(this.NoteID){
      this.getRatingFromDB()
    }
  }

  ngOnInit(): void {

  }



  getRatingFromDB(){
    this.httpService.post<number>('http://localhost:5039/api/Rating/getrating', this.NoteID).subscribe(data => {
      this.DBRating = data
      console.log(this.DBRating)
    })
    this.httpService.post<number>('http://localhost:5039/api/Rating/getratingaverage', this.NoteID).subscribe(data => {
      this.DBRatingAverage = data
      console.log(this.DBRatingAverage)
    })

  }

  onClickButton() {
    if (this.Rating != 0) {
      this.httpService.post('http://localhost:5039/api/Rating/addrating', {
        NoteID: this.NoteID, Rating: this.Rating
      }).subscribe(data => {
      });
    }
  }

  getRatingVal(rating: number) {
    this.Rating = rating
  }
}
