import { Component, OnInit, Input } from '@angular/core';
import { Location, Review } from '../location';
import { Loc8rDataService } from '../loc8r-data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
  providers: [Loc8rDataService]
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;

  constructor(private loc8rDataService: Loc8rDataService) { }

  googleapikey: string = "AIzaSyAOWLiCKLbrQ-z04TyVurAFaeGTjqESShk";

  public newReview: Review = {
      author: '',
      rating: 5,
      reviewText: ''
  }

  public formVisible: boolean = false;
  public formError = '';

  private formIsValid(): boolean {
      if (!this.newReview.author || !this.newReview.rating || !this.newReview.reviewText) return false;
      return true;
  }

  private resetAndHideReviewForm(): void {
      this.newReview = {
          author: '',
          rating: 5,
          reviewText: ''
      };
      this.formVisible = false;
      this.formError = '';
  }

  public onReviewSubmit(): void {
      this.formError = '';
      if (this.formIsValid()) {
        this.loc8rDataService.addReviewByLocationId(this.location._id, this.newReview)
            .then((review: Review) => {
                this.location.reviews.unshift(review);
                this.resetAndHideReviewForm();
            })
      } else {
        this.formError = 'All fields required.';
      }

  }

  ngOnInit() {
  }

}
