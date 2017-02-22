$(document).ready(function(){
	var stylistInput = document.getElementById('location');
	var stylistPlace = new google.maps.places.Autocomplete(stylistInput);

	google.maps.event.addListener(stylistPlace, 'place_changed', function() {
		console.log(place);
		var place = stylistPlace.getPlace();
		var lon = place.geometry.location.lng();
		var lat = place.geometry.location.lat();
		var formattedAddress = place.formatted_address;

		$("#lon").val(lon);
		$("#lat").val(lat);
		$("#formatted-address").val(formattedAddress);
	})
})
