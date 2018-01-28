import { Component, OnInit } from '@angular/core';

export class Location {
    _id: string;
    name: string;
    distance: number;
    address: string;
    rating: number;
    facilities: [string];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor() { }

  locations: Location[] = [{
      _id: "5a6a0c827a720905a64822f0",
      name: "Costy",
      distance: 38.9999,
      address: "Level 1, Dockyard, 38 Hung Luen Road, Hung Hom Bay, Hung Hom",
      rating: 4,
      facilities: ["chair", "noodles", "laughters"]
  }, {
      _id: "5a68585ae7f72632f7dbd763",
      name: "Starbucks",
      distance: 62.234,
      address: "38 Hung Luen Road, G/F Kerry Hotel, Hung Hom, Hong Kong",
      rating: 3,
      facilities: ["Coffee", "iMac", "Premium wifi"]
  }]

  ngOnInit() {
  }

}
