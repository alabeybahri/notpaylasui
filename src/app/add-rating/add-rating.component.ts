import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RatingChangeEvent} from "angular-star-rating";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-add-rating', templateUrl: './add-rating.component.html', styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  public NoteID: number = 0;
  public DBRating: number = 0;
  public DBRatingAverage: number = 0;

  constructor(private httpService: HttpClient,private notify :NotificationService) {
  }

  public get IDNote(): number {
    return this.NoteID;
  }

  @Input()
  public set IDNote(value: number) {
    this.NoteID = value;
    if (this.NoteID) {
      this.getRatingFromDB()
    }
  }

  ngOnInit(): void {

  }


  getRatingFromDB() {
    this.httpService.post<number>('http://localhost:5039/api/Rating/getrating', this.NoteID).subscribe(data => {
      if (data) {
        this.DBRating = data;
      }
    })
    this.httpService.post<number>('http://localhost:5039/api/Rating/getratingaverage', this.NoteID).subscribe(data => {
      if (data) {
        this.DBRatingAverage = data;
      }
    })

  }

  onSetNewRating(rating: number) {
    this.httpService.post('http://localhost:5039/api/Rating/addrating', {
      NoteID: this.NoteID, Rating: rating
    }).subscribe(data => {
    }, (err) => {
    }, () => {
      this.getRatingFromDB();
    });
  }


  public OnRatingChange($event: RatingChangeEvent) {
    if ($event && $event.rating !== this.DBRating) {
      this.onSetNewRating($event.rating);
    }
  }

  clearRating() {
    const UserID = sessionStorage.getItem("userID");
    this.httpService.delete('http://localhost:5039/api/Rating/delete?NoteID=' + this.NoteID + '&UserID=' + UserID).subscribe((data => {
      if(data){
        this.DBRating = 0;
        this.DBRatingAverage = 0;
        this.getRatingFromDB();
      }
    }))
  }
}
