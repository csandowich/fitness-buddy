$(".searchAct").on("click", function(event){
  event.preventDefault();
var act =  $(this).attr("data");
  console.log(act);
});

$("#btn-input").on("click", function(event){
  event.preventDefault();
var actInput =  $(".act-input.selected").attr("data-act");
var genderInput =  $(".gender-input.selected").attr("data-gender");
var stateInput = $("#state-input").val();
console.log(actInput);
  console.log(stateInput);
  console.log(genderInput);
});
$("#searchBtn").on("click", function(event){
  event.preventDefault();
var city = $("#searchCity").val().toLowerCase();
var state = $("#searchState").val();

console.log(state);

});
