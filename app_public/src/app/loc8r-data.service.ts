import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Location } from './home-list/home-list.component';

@Injectable()
export class Loc8rDataService {

  constructor(private http: Http) { }

  private apiBaseUrl = `http://localhost:3000/api/locations/`;

  public getLocations(): Promise<Location[]> {
      const lng = 114.188880;
      const lat = 22.301462;
      const maxDistance = 250;
      const url = `${this.apiBaseUrl}?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
      return this.http
        .get(url)
        .toPromise()
        .then(response => response.json() as Location[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.log('\nERROR\n', error);
      return Promise.reject(error.message || error);
  }
}
