// $(document).ready(function() {

  // function initMap() {
//         var myLatLng = {lat: -25.363, lng: 131.044};
//
//         // Create a map object and specify the DOM element for display.
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: myLatLng,
//           scrollwheel: false,
//           zoom: 4
//         });
//
//         // Create a marker and set its position.
//         var marker = new google.maps.Marker({
//           map: map,
//           position: myLatLng,
//           title: 'Hello World!'
//         });
//       // }
//
//
// });
$(".dropdown-menu li").click(function(){
  var setText = $(this).text();
  var thisButton = $(this).closest(".dropdown");
  $(thisButton).find("button").html(setText);

});

window.onload = getMyLocation;

$('.dropdown-toggle').dropdown();


var map;
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

  // addNearByPlaces(latLng);
  apiMarkerCreate(latLng);

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
}

// function addNearByPlaces(latLng) {

  // var nearByService = new google.maps.places.PlacesService(map);

  // var request = {
  //   location: latLng,
  //   radius: '500',
  //   types: ['']
  // };

//   nearByService.nearbySearch(request, searchNearBy);
// }

function searchNearBy(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      apiMarkerCreate(place.geometry.location, place);
    }
  }
}

function apiMarkerCreate(latLng, placeResult) {
  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true
  };

  //Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(); //markerOptions
  var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
  var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);

map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var infowindow = new google.maps.InfoWindow();
var marker = new google.maps.Marker({
  map: map,
  animation: google.maps.Animation.DROP,
  clickable: true
});
google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map, marker);
});

// Get the full place details when the user selects a place from the
// list of suggestions.
google.maps.event.addListener(autocomplete, 'place_changed', function() {
  infowindow.close();
  var place = autocomplete.getPlace();
  if (!place.geometry) {
    return;
  }

  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }

  // Set the position of the marker using the place ID and location.
  marker.setPlace(/** @type {!google.maps.Place} */ ({
    placeId: place.place_id,
    location: place.geometry.location
  }));
  marker.setVisible(true);

  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      // 'Place ID: ' + place.place_id + '<br>' +
      place.formatted_address + '</div>');
  infowindow.open(map, marker);

  });


//   if (placeResult) {
//     var content = placeResult.name+'<br/>'+placeResult.vicinity+'<br/>'+placeResult.types+'<br/><a href="addmap.php?name='+placeResult.name+'&address='+placeResult.vicinity+'">Add</a>';
//     windowInfoCreate(marker, autocomplete, latLng, content);
//   }
//   else {
//     var content = 'You are here' + latLng.lat() + ', ' + latLng.lng();
//     windowInfoCreate(marker, autocomplete, latLng, content);
//   }
//
// }
//
// function windowInfoCreate(marker, autocomplete, latLng, content) {
//   var infoWindowOptions = {
//     content: content,
//     position: latLng
//   };
//
//   var infowindow = new google.maps.InfoWindow();
//   var marker = new google.maps.Marker({
//     map: map
// });
//
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.open(map, marker);
//   });
//
//   google.maps.event.addListener(autocomplete, 'place_changed', function() {
//     infowindow.close();
//   var place = autocomplete.getPlace();
//   if (!place.geometry) {
//     return;
//   }
//
//   if (place.geometry.viewport) {
//     map.fitBounds(place.geometry.viewport);
//   } else {
//     map.setCenter(place.geometry.location);
//     map.setZoom(17);
//   }
//
//   // Set the position of the marker using the place ID and location.
//   marker.setPlace(/** @type {!google.maps.Place} */ ({
//     placeId: place.place_id,
//     location: place.geometry.location
//   }));
//   marker.setVisible(true);
//
//   infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//       // 'Place ID: ' + place.place_id + '<br>' +
//       place.formatted_address + '</div>');
//   infowindow.open(map, marker);
//
// });
}
