import { Component, OnInit } from '@angular/core';
import { SearchService } from "../search.service";
import { Router } from '@angular/router';
import { DropdownModule } from "ngx-dropdown";

declare var google: any;
declare var map: any;
declare var markers: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  markers: any;
  response: any;

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
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
  	newArea.bindTo('bounds', map);
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapInput);

    setTimeout(function(){
      mapInput.style.opacity = "1";
    },1000);



  	google.maps.event.addListener(newArea, 'place_changed', function() {

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

   //AUTOCOMPLETE END


    this.searchService.getMarkers()
      .subscribe((response) =>
      this.response = this.createMarkers(response, map, newArea));

  }

  createMarkers(response, map, newArea){

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
      google.maps.event.addListener(newArea, 'place_changed', function() {
        marker[1].close();
      });
    });

    this.markers = markers;

  }

  onChange(change){

    var dropDowns = document.getElementsByTagName("select");

    console.log(dropDowns);

    var filters = [];

    for (var i = 0; i < dropDowns.length; i++) {
			if (dropDowns[i].value != "Add filter") {
				filters.push(dropDowns[i].value);
			}
			else {
				filters.push("");
			}
		}

    var allMarkersCriteria = [];

		this.markers.forEach(function(marker){
			var singleMarkerCriteria = {
			price: marker[2].price,
			availability: marker[2].availability,
			mobile: marker[2].mobile,
			services: marker[2].services,
			expertise: marker[2].expertise,
			marker: marker
			};
			allMarkersCriteria.push(singleMarkerCriteria);
		})

    console.log(allMarkersCriteria);

		//loop through all markers to test criteria
		//to modify filters only! change the conditions below, one for each category

		// allMarkersCriteria.forEach(function(marker){
		// 	console.log(marker);
		// 	console.log(marker["services"], filters[3]);
		// 	if (filters[0] != " " && filters[0] != marker["price"] ||
		// 		(filters[1] != " " && marker["availability"].indexOf(filters[1]) == -1 && filters[1] != "Every Day") ||
		// 		(filters[2] != " " && filters[2] != marker["mobile"] && marker["mobile"] != "Both")||
		// 		(filters[3] != " " && marker["services"].indexOf(filters[3]) == -1)||
		// 		(filters[4] != " " && filters[4] != marker["expertise"] && filters[4] != "Any" && marker["expertise"] != "Any")
		// 	) {
		// 		marker["marker"][0].setVisible(false);
		// 	}
		// 	else {
		// 		marker["marker"][0].setVisible(true);
		// 	}
		// })
  }

}
