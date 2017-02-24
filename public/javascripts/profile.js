$(document).ready(function() {

  $('.review').on('click', function(event) {
    var stylistName = $(event.target).closest('li').find('p').text();
    $('#stylistName').attr('value', stylistName);
    $('.reviewBox').toggleClass("hide");
  });

	$('#book').on('click', function(event) {
    $('.appointmentBox').toggleClass("hide");
  });

  $('.sendRequest').on('click', function(event) {
    // event.preventDefault();
    $('.bookingConfirmation').toggleClass("hide");
    $('.appointmentBox').toggleClass("hide");


  });

  $('.rejectReq').on('click', function(event) {
    console.log("hellow im rejecting you");
    $(event.target).closest('div').remove();

    var appointmentCompleted = {};

    function first(){
      return $.ajax({
        url: "http://localhost:3000/api/appointments",
        method: "GET",
        success: function(response){
          response.forEach(function(appointment,index){
            var appId = response[index]._id;
            var appointmentId = $(event.target).closest('div').find('span.appId').text();
            // console.log("appId api: ", appId);

            if (appId == appointmentId) {
              console.log("appId db: ", appointmentId + "api Id: ", appId);
              appointmentCompleted.accept = appId;
            }

          });
        },
        error: function(error){
        }
      });
    }

    function second(){
      return $.ajax({
        url: "http://localhost:3000/api/appointmentrejected",
        method: "POST",
        data: appointmentCompleted,
        success: function(response){
          console.log("success");
        },
        error: function(response){
          console.log("error",error);
        }
      });
    }

    function runAjaxCalls(){
      first().then(second);
    }

    runAjaxCalls();







  });

  $('.acceptReq').on('click', function(event) {
    console.log("hellow im accepting you");
    $(event.target).closest('span').toggleClass('hide');
    $(event.target).closest('div').find('p').toggleClass('hide');

    var appointmentCompleted = {};

    function first(){
      return $.ajax({
        url: "http://localhost:3000/api/appointments",
        method: "GET",
        success: function(response){
          response.forEach(function(appointment,index){
            var appId = response[index]._id;
            var appointmentId = $(event.target).closest('div').find('span.appId').text();
            // console.log("appId api: ", appId);

            if (appId == appointmentId) {
              // console.log("appId db: ", appointmentId + "api Id: ", appId);
              appointmentCompleted.accept = appId;
            }

          });
        },
        error: function(error){
        }
      });
    }

    function second(){
      return $.ajax({
        url: "http://localhost:3000/api/appointmentreturned",
        method: "POST",
        data: appointmentCompleted,
        success: function(response){
          console.log("success");
        },
        error: function(response){
          console.log("error",error);
        }
      });
    }

    function runAjaxCalls(){
      first().then(second);
    }

    runAjaxCalls();




  });

});
