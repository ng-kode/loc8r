import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Location } from './home-list/home-list.component';

@Injectable()
export class Loc8rDataService {

  constructor(private http: Http) { }

  private apiBaseUrl = `http://localhost:3000/api`;

  public getLocations(lng: number, lat: number): Promise<Location[]> {
      // const lng = 114.22120579999999;
      // const lat = 22.3064319;
      const maxDistance = 250;
      const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
      return this.http
        .get(url)
        .toPromise()
        .then(response => response.json() as Location[])
        .catch(this.handleError);
  }

  public getLocationById(locationid: any): Promise<Location> {
      const url = `${this.apiBaseUrl}/locations/${locationid}`
      return this.http
        .get(url)
        .toPromise()
        .then(response => response.json() as Location)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.log('\nERROR\n', error);
      return Promise.reject(error.message || error);
  }
}
