$(document).ready(function() {

  $('.review').on('click', function(event) {
    var stylistName = $(event.target).closest('li').find('p').text();
    $('#stylistName').attr('value', stylistName);
    $('.reviewBox').toggleClass("hide");
  });

});
