// Initialize Firebase
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

  $("#athlete-form").on("submit", function(e){
  	e.preventDefault();

  	var activityInput = $(".act-input.selected").attr("data-act").trim();
  	var firstNameInput = $("#name-input").val().trim();
  	var lastNameInput = $("#lastName-input").val().trim();
  	var genderInput = $("#gender-dropdown").val().trim();
  	var cityInput = $("#city-input").val().trim();
  	var stateInput = $("#stateInput").val().trim();
  	var placeInput = $("#place-input").val().trim();
  	var dateInput = $("#date-input").val().trim();
  	var startTimeInput = $("#time-input").val().trim();
  	var emailInput = $("#email-input").val().trim();
  	var commentInput = $("#comment-input").val().trim();

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
  	var aActivity = snap.val().activity;
  	var aFirstName = snap.val().firstName;
  	var aLastName = snap.val().lastName;
  	var aGender = snap.val().gender;
  	var aCity = snap.val().city;
  	var aState = snap.val().state;
  	var aPlace = snap.val().location;
  	var aDate = snap.val().date;
  	var aStartTime = snap.val().startTime;
  	var aEmail = snap.val().email;
  	var aComment = snap.val().comment;

  	$("#display >tbody").append( "<tr>"+
  		"<td>"+ aActivity +"</td>"+
  		"<td>"+ aCity +"</td>"+
  		"<td>"+ aState +"</td>"+
  		"<td>"+ aDate +"</td>"+
  		"<td>"+ aStartTime +"</td>"+
  		"<td>"+ aFirstName +"</td>"+
  		"<td><i class='info circle icon'></i></td></tr>");


  });

