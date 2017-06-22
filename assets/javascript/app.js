// Initialize Firebase
var config = {
  apiKey: "AIzaSyBu4pjbzzKjgREDEnQK3sYa4_0TUQDnVcc",
  authDomain: "test-b14d0.firebaseapp.com",
  databaseURL: "https://test-b14d0.firebaseio.com",
  projectId: "test-b14d0",
  storageBucket: "test-b14d0.appspot.com",
  messagingSenderId: "781144526712"
};
firebase.initializeApp(config);

  var database = firebase.database();
  var likeRef = database.ref("/likes");
  var showDetail;
  var weather;
  var id;
  var likeCount = 0;
//like button
likeRef.on("value", function(snap){

  $("#likeCount").html(snap.val().like);
  likeCount = snap.val().like;

}, function(err){
  console.log(err);
});

$("#likeClick").on("click", function(){
  console.log(likeCount);
  likeCount++;
  likeRef.set({
    like: likeCount
  });
});
//FUNCTION STORES INPUT DATA IN FIREBASE AND APPENDS TO TABLE
  $("#athlete-form").on("submit", function(e){
  	e.preventDefault();


  	var activityInput = $(".act-input.selected").attr("data-act");
  	var firstNameInput = $("#name-input").val().trim().toLowerCase();
  	var lastNameInput = $("#lastName-input").val().trim().toLowerCase();
  	var genderInput = $("#gender-dropdown").val().trim().toLowerCase();
  	var cityInput = $("#city-input").val().trim().toLowerCase();
  	var stateInput = $("#state-input").val().trim().toLowerCase();
  	var placeInput = $("#place-input").val().trim().toLowerCase();
  	var dateInput = $("#date-input").val().trim().toLowerCase();
  	var startTimeInput = $("#time-input").val().trim().toLowerCase();
  	var emailInput = $("#email-input").val().trim().toLowerCase();
  	var commentInput = $("#comment-input").val().trim().toLowerCase();
    var ageInput = $(".age-input.selected").attr("data-age");
// console.log(activityInput);

  	var athleteInfo = {

  		activity: activityInput,
  		firstName: firstNameInput,
  		lastName: lastNameInput,
  		gender: genderInput,
      age: ageInput,
  		city: cityInput,
  		state: stateInput,
  		place: placeInput,
  		date: dateInput,
  		startTime: startTimeInput,
  		email: emailInput,
  		comment: commentInput,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  		};


  	database.ref().push(athleteInfo);
       $("form").form("clear");
     });

  database.ref().on("child_added", function(snap){

    generalDisplay(snap);
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
   });

//show all activity
$("#showAllAct").on("click", function(e){
  	$("#display >tbody").html("");
  e.preventDefault();
    database.ref().on("child_added", function(snap){
      generalDisplay(snap);

    });
});

//ACTIVITY BUTTONs
$(".searchAct").on("click", function(event){
	event.preventDefault();
	$("#display >tbody").html("");
	var searchAct = $(this).attr("data");

	console.log(searchAct);

		database.ref().orderByChild("activity").equalTo(searchAct).on("child_added", function(snap){

    // console.log(snap.val());
		// console.log(snap.val().activity);
		generalDisplay(snap);

		});
});
//FILTER BY CITY
$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	$("#display >tbody").html("");
	var searchCity = $("#searchCity").val().toLowerCase();

	$("form").form("clear");


	database.ref().orderByChild("city").equalTo(searchCity).on("child_added", function(snap){
		// console.log(snap.val());
		generalDisplay(snap);
  });


});
//for detail
$(document).on("mouseenter",".detail", getDetail);

function getDetail(){

   id = $(this).attr("data-key");
  //  console.log(id)

 database.ref().orderByKey().equalTo(id).on("child_added", function(snap){

weatherAPI(snap);
googleMap(snap);
// showDetail(snap);
   showDetail = "<div class='ui segment inverted grey'><p>" + "Details:" + "</p><p>" +
   "Name: " + snap.val().firstName.toUpperCase() + "</p><p>" +
   "Lastname: " + snap.val().lastName.toUpperCase() + "</p><p>" +
   "Gender: " + snap.val().gender.toUpperCase() + "</p><p>" +
   "Age: " + snap.val().age + "</p><p>" +
   "Place: " + snap.val().place.toUpperCase() + "</p><p>" +
   "Weather: " + weather + "°F"+ "</p><p>" +
   "City: " + snap.val().city.toUpperCase() + "</p><p>" +
   "Email: " + snap.val().email.toUpperCase() + "</p><p>" +
   "Comment: " + snap.val().comment + "</p><p>" +
   "Don't know how to get there: " + "<a href='testdirection.html' target= _blank>" + "Location" + "</a></p></div>";


   $('.icon.detail')
   .popup({
    on: "click",
    html: showDetail

   });
 });
}


//GENERAL DISPLAY FUNCTION
function generalDisplay(snap) {

		$("#display >tbody").append( "<tr>"+
  		"<td>"+ snap.val().activity.toUpperCase() +"</td>"+
  		"<td>"+ snap.val().city.toUpperCase() +"</td>"+
  		"<td>"+ snap.val().state.toUpperCase() +"</td>"+
  		"<td>"+ snap.val().date.toUpperCase() +"</td>"+
  		"<td>"+ snap.val().startTime.toUpperCase() +"</td>"+
  		"<td>"+ snap.val().firstName.toUpperCase() +"</td>"+
  		"<td><i class='info circle icon detail' data-key=" + snap.key + "></i></td></tr>");
	}

  function weatherAPI(snap){
    var dCity = snap.val().city;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + dCity + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";

   $.ajax({
      url: queryURL,
      method: "GET",
      async: false,
    }).done(function(response) {
      // console.log(response);
      // console.log(response.main.temp);
      weather = response.main.temp;
  });

 }


function googleMap(snap){
  // console.log(snap.val().place);
  // console.log(snap.val().city);
  var googlePlace = localStorage.setItem("place", snap.val().place );
  var googleCity = localStorage.setItem("city", snap.val().city);


}
