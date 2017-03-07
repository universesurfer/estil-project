import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var mapOptions = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    console.log(document.getElementById("map"));
  }

  getMyLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showMapWithMyLocation);
    // } else {
    //   alert('Oops, no geolocation support');
    // }
  }

}
