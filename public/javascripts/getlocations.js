var stylistInput = document.getElementById('location');
var stylistPlace = new google.maps.places.Autocomplete(stylistInput);

google.maps.event.addListener(stylistPlace, 'place_changed', function() {
	var place = stylistPlace.getPlace();
	console.log(place);
})
