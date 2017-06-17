Initialize Firebase
   var config = {
    apiKey: "AIzaSyCXN9XhGk6V7nODMRaaccn1_e-NOvnGtdY",
    authDomain: "fitness-buddy-d10a3.firebaseapp.com",
    databaseURL: "https://fitness-buddy-d10a3.firebaseio.com",
    projectId: "fitness-buddy-d10a3",
    storageBucket: "fitness-buddy-d10a3.appspot.com",
    messagingSenderId: "556464695807"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
 //INITIAL VALUES
  var aActivity = "";
  var aFirstName = "";
  var aLastName = "";
  var aGender = ""
  var aCity = "";
  var aState = "";
  var aPlace = "";
  var aDate = "";
  var aStartTime = "";
  var aEmail = "";
  var aComment = "";

//FUNCTION STORES INPUT DATA IN FIREBASE AND APPENDS TO TABLE
  $("#btn-input").on("click", function(e){
  	e.preventDefault();

  	$("#display >tbody").html("");
  	var activityInput = $(".act-input.selected").attr("data-act").trim().toLowerCase();
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


  	console.log(activityInput);
  	console.log(firstNameInput);
  	console.log(lastNameInput);
  	console.log(genderInput);
  	console.log(cityInput);
  	console.log(stateInput);
  	console.log(placeInput);
  	console.log(dateInput);
  	console.log(startTimeInput);
  	console.log(emailInput);
  	console.log(commentInput);

  	var athleteInfo = {
  		activity: activityInput,
  		firstName: firstNameInput,
  		lastName: lastNameInput,
  		gender: genderInput,
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

  		$(".act-input.selected").val("");
  		$("#name-input").val("");
  		$("#lastName-input").val("");
  		$("#gender-dropdown").val("");
  		$("#city-input").val("");
  		$("#state-input").val("");
  		$("#place-input").val("");
  		$("#date-input").val("");
  		$("#time-input").val("");
  		$("#email-input").val("");
  		$("#comment-input").val("");


  });

  database.ref().on("child_added", function(snap){
  	aActivity = snap.val().activity;
  	aFirstName = snap.val().firstName;
  	aLastName = snap.val().lastName;
  	aGender = snap.val().gender;
  	aCity = snap.val().city;
  	aState = snap.val().state;
  	aPlace = snap.val().location;
  	aDate = snap.val().date;
  	aStartTime = snap.val().startTime;
  	aEmail = snap.val().email;
  	aComment = snap.val().comment;

  	$("#display >tbody").append( "<tr>"+
  		"<td>"+ aActivity +"</td>"+
  		"<td>"+ aCity +"</td>"+
  		"<td>"+ aState +"</td>"+
  		"<td>"+ aDate +"</td>"+
  		"<td>"+ aStartTime +"</td>"+
  		"<td>"+ aFirstName +"</td>"+
  		"<td><i class='info circle icon'></i></td></tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
   });

//ACTIVITY BUTTONs
$(".searchAct").on("click", function(event){
	event.preventDefault();
	$("#display >tbody").html("");
	var searchAct = $(this).attr("data");
	console.log(searchAct);

		database.ref().orderByChild("activity").equalTo(searchAct).on("child_added", function(snap){
		console.log(snap.val());
		console.log(snap.val().activity);
		generalDisplay(snap);
		});
});
//FILTER BY CITY AND DATE
$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	$("#display >tbody").html("");
	var searchCity = $("#searchCity").val().toLowerCase();
	var searchDate = $("#searchDate").val();
	$("form").form("clear");
	//var searchState = $("#searchState").val().toLowerCase();
	console.log(searchDate);
	console.log(searchCity);
	//console.log(searchState);

	database.ref().orderByChild("city" || "date").equalTo(searchCity || searchDate).on("child_added", function(snap){
		console.log(snap.val());
		generalDisplay(snap);
		})

	// database.ref().orderByChild("city", "date").equalTo(searchCity).equalTo(searchDate).on("child_added", function(snap){
	// 	console.log(snap.val());
	// 	generalDisplay(snap);
	// 	})
});

//GENERAL DISPLAY FUNCTION
function generalDisplay(snap) {
	// $("#display >tbody").html("");
		$("#display >tbody").append( "<tr>"+
  		"<td>"+ snap.val().activity +"</td>"+
  		"<td>"+ snap.val().city +"</td>"+
  		"<td>"+ snap.val().state +"</td>"+
  		"<td>"+ snap.val().date +"</td>"+
  		"<td>"+ snap.val().startTime +"</td>"+
  		"<td>"+ snap.val().firstName +"</td>"+
  		"<td><i class='info circle icon'></i></td></tr>");
	};
