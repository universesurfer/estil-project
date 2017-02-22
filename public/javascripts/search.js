var map, markers = [];

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMapWithMyLocation);
  } else {
    alert('Oops, no geolocation support');
  }
}

//This function is inokved asynchronously by the HTML5 geolocation API.
function showMapWithMyLocation(position) {
  //The latitude and longitude values obtained from HTML 5 API.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

	var myPosition = {
		lat: latitude,
		lng: longitude
	}

	map = new google.maps.Map(
		document.getElementById('map'),
		{
		 zoom: 15,
		 center: myPosition
		}
	);

	// var myMarker = new google.maps.Marker({
	//   position: myPosition,
	//   map: map
	// });

	runAutocomplete();

	$.ajax({
		url: "http://localhost:3000/api/search",
		method: "POST",
		success: function(response) {

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

					var content = "<a href='./view-stylist/" + firstName + "." + lastName+ "'>" + stylistName + "</a><br>" +  response[stylistMapInfo]["address"];

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
			})

		},
		error: function(error) {
			console.log(error);
		}
	})

}

function runAutocomplete() {

	//takes input and performs autocomplete
	var mapInput = document.getElementById('pac-input');
	var newArea = new google.maps.places.Autocomplete(mapInput);
	var type = "Area Changed";
	newArea.bindTo('bounds', map);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapInput);

	var infowindow = new google.maps.InfoWindow();

	//Marker for new autocomplete location

  // var marker = new google.maps.Marker({
	//   map: map
	// });

	// google.maps.event.addListener(marker, 'click', function() {
	// 	infowindow.open(map, marker);
	// });

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

		// marker.setPlace({
		// 	placeId: place.place_id,
		// 	location: place.geometry.location
		// });
		// marker.setVisible(true);
		//
		// infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
		// infowindow.open(map, marker);
	});

}

//generates initial map based on geolocation
$(document).ready(function(){
	getMyLocation();

	// Sets new option of dropdown

	$(".dropdown-menu li").click(function(){
	  var setText = $(this).text();
	  var thisButton = $(this).closest(".dropdown");
	  $(thisButton).find("button").html(setText);

		var dropDowns = $(".dropdown-toggle");

		//collect active filters

		var filters = [];

		for (var i = 0; i < dropDowns.length; i++) {
			if (dropDowns[i].innerHTML.indexOf("span class=") != -1) {
				filters.push(" ");
			}
			else {
				filters.push(dropDowns[i].innerHTML)
			}
		}

		//collect every marker's criteria

		allMarkersCriteria = [];

		markers.forEach(function(marker){
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


		//loop through all markers to test criteria

		allMarkersCriteria.forEach(function(marker){
			console.log(filters[4]);
			console.log(marker["expertise"]);
			if (filters[0] != " " && filters[0] != marker["price"] ||
				(filters[1] != " " && marker["availability"].indexOf(filters[1]) == -1) ||
				(filters[2] != " " && filters[2] != marker["mobile"])||
				(filters[3] != " " && filters[3] != marker["services"])||
				(filters[4] != " " && filters[4] != marker["expertise"])
			) {
				marker["marker"][0].setVisible(false);
			}
			else {
				marker["marker"][0].setVisible(true);
			}
		})

		// allMarkersCriteria.forEach(function(marker){
		// 	console.log(filters[1]);
		// 	console.log(marker["availability"].indexOf(filters[1]));
		// 	if (filters[0] != " " && filters[0] != marker["price"]){
		// 		marker["marker"][0].setVisible(false);
		// 	}
		// 	if (filters[1] != " " && marker["availability"].indexOf(filters[1]) == -1) {
		// 		console.log("here");
		// 		marker["marker"][0].setVisible(false);
		// 	}
		// 	if (filters[2] != " " && filters[2] != marker["mobile"]){
		// 		marker["marker"][0].setVisible(false);
		// 	}
		// 	if (filters[3] != " " && filters[3] != marker["services"]){
		// 		marker["marker"][0].setVisible(false);
		// 	}
		// 	if (filters[4] != " " && filters[4] != marker["expertise"]){
		// 		marker["marker"][0].setVisible(false);
		// 	}
		// })


		// var that = this;
		//
		// //filter by day of the week availability
		//
		// if ($(that).parent().attr("id") == "availability") {
		// 	markers.forEach(function(marker){
		// 		var filterCategory = marker[2][$(that).parent().attr("id")];
		// 		if (setText != "Every Day") {
		// 			if (filterCategory.indexOf(setText) != -1) {
		// 				marker[0].setVisible(true);
		// 			}
		// 			else {
		// 				marker[0].setVisible(false);
		// 			};
		// 		}
		// 		else {
		// 			marker[0].setVisible(true);
		// 		}
		// 	});
		// }

	});

})
