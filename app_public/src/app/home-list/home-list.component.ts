import { Component, OnInit } from '@angular/core';
import { Loc8rDataService } from '../loc8r-data.service';
import { GeolocationService } from '../geolocation.service';

export class Location {
    _id: string;
    name: string;
    distance: number;
    address: string;
    rating: number;
    facilities: [string];
    reviews: [any];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [GeolocationService, Loc8rDataService]
})
export class HomeListComponent implements OnInit {

  constructor(private geolocationService: GeolocationService, private loc8rDataService: Loc8rDataService) { }

  locations: Location[];
  message: string;

  private getLocations(position: any): void {
      this.message = "Getting wifi locations nearby";
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.loc8rDataService.getLocations(lng, lat).then(foundLocations => {
          this.message = "Here you go!"
          this.locations = foundLocations;
      });
  }

  private showError(): void {
      this.message = "Error with getPosition";
  }

  private noGeo(): void {
      this.message = "Navigator geolocation not available";
  }

  private getPosition(): void {
      this.message = "Getting your position";
      this.geolocationService.getPosition(
          this.getLocations.bind(this),
          this.showError.bind(this),
          this.noGeo.bind(this)
      );
  }

  ngOnInit() {
      this.getPosition();
  }

}
