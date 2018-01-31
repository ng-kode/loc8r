import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Loc8rDataService } from '../loc8r-data.service';
import { Location } from '../location';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [Loc8rDataService]
})
export class DetailsPageComponent implements OnInit {

  constructor(
      private loc8rDataService: Loc8rDataService,
      private route: ActivatedRoute
  ) { }

  pageContent = {
      header: {
          title: "",
          strapline: ""
      },
      sidebar: ""
  }

  newLocation: Location;

  ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => {
            let id = params.get("locationid");
            return this.loc8rDataService.getLocationById(id);
        })
        .subscribe((newLocation: Location) => {
            this.newLocation = newLocation;
            this.pageContent.header.title = newLocation.name;
            this.pageContent.sidebar = `${newLocation.name} is on Loc8r because of its wifi and good review.
                            If you've been here and want to help, please leave a review here too!`;
        });
  }

}
