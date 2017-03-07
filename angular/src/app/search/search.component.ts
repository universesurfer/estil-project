import { Component, OnInit } from '@angular/core';

declare var google: any;
declare var map: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showMapWithMyLocation);
    } else {
      alert('Oops, no geolocation support');
    }

  }

  showMapWithMyLocation(position) {
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

    console.log(this);

    // this.runAutocomplete();

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

  }

  // runAutocomplete() {
  //
  // 	//takes input and performs autocomplete
  // 	var mapInput = document.getElementById('pac-input');
  // 	var newArea = new google.maps.places.Autocomplete(mapInput);
  // 	var type = "Area Changed";
  // 	newArea.bindTo('bounds', map);
  // 	map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapInput);
  //
  // 	var infowindow = new google.maps.InfoWindow();
  //
  // 	google.maps.event.addListener(newArea, 'place_changed', function() {
  // 		infowindow.close();
  // 		var place = newArea.getPlace();
  // 		if (!place.geometry) {
  // 			return;
  // 		}
  //
  // 		if (place.geometry.viewport) {
  // 			map.fitBounds(place.geometry.viewport);
  // 		} else {
  // 			map.setCenter(place.geometry.location);
  // 			map.setZoom(17);
  // 		}
  //
  // 	});
  //
  // }


}
