// Sets new option of dropdown

$(".dropdown-menu li").click(function(){
  var setText = $(this).text();
  var thisButton = $(this).closest(".dropdown");
  $(thisButton).find("button").html(setText);
});


var map;

//generates initial map based on geolocation
window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert('Oops, no geolocation support');
  }
}

//This function is inokved asynchronously by the HTML5 geolocation API.
function displayLocation(position) {
  //The latitude and longitude values obtained from HTML 5 API.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  //Creating a new object for using latitude and longitude values with Google map.
  var latLng = new google.maps.LatLng(latitude, longitude);
  showMap(latLng);
}

function showMap(latLng) {
  //Setting up the map options like zoom level, map type.
  var mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //Creating the Map instance and assigning the HTML div element to render it in.
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//takes input and performs autocomplete
	var mapInput = document.getElementById('pac-input');
	var newArea = new google.maps.places.Autocomplete(mapInput);
	var type = "Area Changed";

	newArea.bindTo('bounds', map);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapInput);

	markerCreate(newArea, type);

}

function markerCreate(autocomplete, type) {

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
	  map: map
	});

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {

  	var place = autocomplete.getPlace();

		// Set the position of the marker using the place ID and location.
	  marker.setPlace({
	    placeId: place.place_id,
	    location: place.geometry.location
	  });
		console.log(place.place_id);
		console.log(place.geometry.location);
		console.log(place);
	  marker.setVisible(true);

		infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');

		if (type == "Area Changed") {
			infowindow.close();
			if (!place.geometry) {
				return;
			}

		  if (place.geometry.viewport) {
		    map.fitBounds(place.geometry.viewport);
		  } else {
		    map.setCenter(place.geometry.location);
		    map.setZoom(17);
		  }
		}
	});
}
