// $(".searchAct").on("click", function(event){
//   event.preventDefault();
// var act =  $(this).attr("data");
//   console.log(act);
// });
//
// $("#btn-input").on("click", function(event){
//   event.preventDefault();
// var actInput =  $(".act-input.selected").attr("data-act");
// var genderInput =  $(".gender-input.selected").attr("data-gender");
// var stateInput = $("#state-input").val();
// console.log(actInput);
//   console.log(stateInput);
//   console.log(genderInput);
// });
// $("#searchBtn").on("click", function(event){
//   event.preventDefault();
// var city = $("#searchCity").val().toLowerCase();
// var state = $("#searchState").val();
//
// console.log(state);
//
// });


// Initialize Firebase
 var config = {
   apiKey: "AIzaSyARVM_9Lr8PJYOCXWHob83gi0rZLdveJU4",
   authDomain: "project1-e35f8.firebaseapp.com",
   databaseURL: "https://project1-e35f8.firebaseio.com",
   projectId: "project1-e35f8",
   storageBucket: "project1-e35f8.appspot.com",
   messagingSenderId: "247681814827"
 };
  firebase.initializeApp(config);
  var database = firebase.database();
  // var gymRef = database.ref("/gym");
  // var pickleballRef = database.ref("/pickleball");
  // var runRef = database.ref("/run");
  // var tennisRef = database.ref("/tennis");
  // var yogaRef = database.ref("/yoga");

  $("#athlete-form").on("submit", function(e){
  	e.preventDefault();

  	var activityInput = $(".act-input.selected").attr("data-act");
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
  		// $(".act-input.selected").val("");
  		// $("#name-input").val("");
  		// $("#lastName-input").val("");
  		// $("#gender-dropdown").val("");
  		// $("#city-input").val("");
  		// $("#state-input").val("");
  		// $("#place-input").val("");
  		// $("#date-input").val("");
  		// $("#time-input").val("");
  		// $("#email-input").val("");
  		// $("#comment-input").val("");
      $("form").form("clear");

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
