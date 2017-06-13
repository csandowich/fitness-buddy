$(".searchAct").on("click", function(event){
  event.preventDefault();
var act =  $(this).attr("data");
  console.log(act);
});

$("#btn-input").on("click", function(event){
  event.preventDefault();
var actInput =  $(".act-input").attr("data-act");
  console.log(actInput);
});
$("#searchBtn").on("click", function(event){
  event.preventDefault();
var city = $("#searchCity").val().toLowerCase();
var state = $("#searchState").val();
console.log(state);

});
