import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';

declare var google: any;
declare var map: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  response: any;

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("SearcgComponetn");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showMapWithMyLocation.bind(this));
    } else {
      alert('Oops, no geolocation support');
    }

  }

  showMapWithMyLocation(position) {
    console.log("showMapLocation");
    //The latitude and longitude values obtained from HTML 5 API.
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

  	var myPosition = {
  		lat: latitude,
  		lng: longitude
  	}

  	var map = new google.maps.Map(
  		document.getElementById('map'),
  		{
  		 zoom: 15,
  		 center: myPosition
  		}
  	);

    //AUTOCOMPLETE

    // takes input and performs autocomplete
  	var mapInput = document.getElementById('pac-input');
  	var newArea = new google.maps.places.Autocomplete(mapInput);
  	var type = "Area Changed";
  	newArea.bindTo('bounds', map);
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapInput);

  	var infowindow = new google.maps.InfoWindow();

  	google.maps.event.addListener(newArea, 'place_changed', function() {
  		infowindow.close();
  		var place = newArea.getPlace();
  		if (!place.geometry) {
  			return;
  		}

  		if (place.geometry.viewport) {
  			map.fitBounds(place.geometry.viewport);
  		} else {
  			map.setCenter(place.geometry.location);
  			map.setZoom(17);
  		}

  	});

;    //AUTOCOMPLETE END


    this.session.getMarkers()
      .subscribe((response) =>
      this.response = this.createMarkers(response, map));

  }

  createMarkers(response, map){

  var markers = [];
    for (var stylistMapInfo in response) {
    	if (response.hasOwnProperty(stylistMapInfo)){

    		var lat = response[stylistMapInfo]["geolocation"]["coordinates"][1];
    		var lon = response[stylistMapInfo]["geolocation"]["coordinates"][0];

    		var stylistMarker = {
    			lat: lat,
    			lng: lon
    		};

    		var addMarker = new google.maps.Marker({
    			position: stylistMarker,
    			map: map
    		});

    		var firstName = response[stylistMapInfo]["firstName"];
    		var lastName = response[stylistMapInfo]["lastName"];

    		var stylistName = firstName + " " + lastName;

    		var content = "<a href='./view-stylist/" + firstName + "." + lastName+ "'>" + stylistName + "</a><br>" +  response[stylistMapInfo]["location"];

    		var infoWindow = new google.maps.InfoWindow({
    			content: content
    		});

    		markers.push([addMarker,infoWindow,response[stylistMapInfo]]);

    	}
    }

    markers.forEach(function(marker) {
    	google.maps.event.addListener(marker[0], 'click', function() {
    		marker[1].open(map, marker[0]);
    	});
    });

  }

}
