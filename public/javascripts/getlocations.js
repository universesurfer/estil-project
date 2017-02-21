$(document).ready(function(){
	var stylistInput = document.getElementById('location');
	var stylistPlace = new google.maps.places.Autocomplete(stylistInput);

	google.maps.event.addListener(stylistPlace, 'place_changed', function() {
		var place = stylistPlace.getPlace();
		var lon = place.geometry.location.lng();
		var lat = place.geometry.location.lat();

		$("#lon").val(lon);
		$("#lat").val(lat);
	})
})
