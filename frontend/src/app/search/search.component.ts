import { Component, OnInit } from '@angular/core';
import { SearchService } from "../search.service";
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { DropdownModule } from "ngx-dropdown";
import { NgZone } from '@angular/core';
import { BookingComponent } from './booking/booking.component';

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

  myLocationMarker: any;
  myLocationInfoWindow: any;
  markers: any;
  stylists: any;
  list: boolean = false;
  distance: number = 10;
  stylist: any;

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private searchService: SearchService,
    private session: SessionService,
    private router: Router,
    private zone: NgZone
  ) { }

  shrinkMap(stylist){
    document.getElementById("col-map").style.display = "none";
    this.list = true;

    var tableRows = document.getElementsByTagName("tr");
    for (var i = 0; i < tableRows.length; i++) {
      if (i % 2 == 0) {
        tableRows[i].style.backgroundColor = "white";
      }
      else {
        tableRows[i].style.backgroundColor = "#f8f8f8";
      }
    }
    event.srcElement.parentElement.parentElement.style.backgroundColor = "#b2e7ff";

    this.stylist = stylist;

  }

  growMap(){
    document.getElementById("col-map").style.display = "block";
    this.list = false;

    var tableRows = document.getElementsByTagName("tr");
    for (var i = 0; i < tableRows.length; i++) {
      if (i % 2 == 0) {
        tableRows[i].style.backgroundColor = "white";
      }
      else {
        tableRows[i].style.backgroundColor = "#f8f8f8";
      }
    }
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showMapWithMyLocation.bind(this));
    } else {
      alert('Oops, no geolocation support');
    }

    this.session.url = this.router.url;
    this.session.checkHome();

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

    //SET CURRENT LOCATION MARKER

   this.myLocationMarker = new google.maps.Marker({
     position: myPosition,
     map: map
   });

   this.myLocationMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

   this.myLocationInfoWindow = new google.maps.InfoWindow({
     content: "You are here"
   });

   this.myLocationInfoWindow.open(map,this.myLocationMarker);

    //AUTOCOMPLETE

    // takes input and performs autocomplete
  	var mapInput = document.getElementById('pac-input');

  	var newArea = new google.maps.places.Autocomplete(mapInput);
  	newArea.bindTo('bounds', map);

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

      //"YOU ARE HERE" MARKER CHANGES ON NEW LOCATION

     this.myLocationInfoWindow.close();
     this.myLocationMarker.setMap(null);

     this.myLocationMarker = new google.maps.Marker({
       position: {"lat":place.geometry.location.lat(),"lng":place.geometry.location.lng()},
       map: map,
     });
     this.myLocationMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

     this.myLocationInfoWindow.open(map,this.myLocationMarker);

     //

      this.searchService.search([place.geometry.location.lng(),place.geometry.location.lat()])
        .subscribe((response) => {
          this.zone.run(() => {
            var stylistData = {};
            response.forEach(function(stylist,index){
              stylist.obj.distanceFromLocation = Number(stylist.dis.toFixed(2));
              stylistData["stylist" + index] = stylist.obj;
            })
            this.stylists = this.createMarkers(stylistData, map, newArea);
          });
      })

  	}.bind(this));

   //AUTOCOMPLETE END

   this.searchService.search([myPosition.lng,myPosition.lat])
     .subscribe((response) => {
       console.log(response);
       this.zone.run(() => {
         var stylistData = {};
         response.forEach(function(stylist,index){
           stylist.obj.distanceFromLocation = Number(stylist.dis.toFixed(2));
           stylistData["stylist" + index] = stylist.obj;
         })
         this.stylists = this.createMarkers(stylistData, map, newArea);

         document.getElementById("table-headers").classList.remove("hidden");
      });
   })

  }

  createMarkers(response, map, newArea){

  var markers = [];
    for (var stylistMapInfo in response) {
    	if (response.hasOwnProperty(stylistMapInfo) && typeof response[stylistMapInfo]["geolocation"] != "undefined"){

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


    var stylists = [];
    for (var stylistInfo in response) {
      if (typeof response[stylistInfo]["geolocation"] != "undefined"){
        stylists.push(response[stylistInfo]);
      }
    }

    //adding a marker to each stylist object

    markers.forEach(function(marker,index){
      stylists[index].marker = marker[0];
		})

    return stylists;

  }

  onChange(change){

    var dropDowns = document.getElementsByTagName("select");
    var filters = [];

    for (var i = 0; i < dropDowns.length - 1; i++) {
			if (dropDowns[i].selectedIndex != 0) {
				filters.push(dropDowns[i].value);
			}
			else {
				filters.push(" ");
			}
		}

    //comparing the object property against the active filter

		this.stylists.forEach(function(marker){
			if (filters[0] != " " && filters[0] != marker["price"] ||
				(filters[1] != " " && marker["availability"].indexOf(filters[1]) == -1) ||
				(filters[2] != " " && filters[2] != marker["mobile"] && marker["mobile"] != "Both") ||
				(filters[3] != " " && marker["languages"].indexOf(filters[3]) == -1)||
				(filters[4] != " " && filters[4] != marker["expertise"] && marker["expertise"] != "Any")
			) {
				marker["marker"].setVisible(false);
			}
			else {
				marker["marker"].setVisible(true);
			}
		})

  }

}
