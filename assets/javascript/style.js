//gender dropdown
$('.ui.dropdown').dropdown();

//form authorization
 $(".ui.form")
 .form({
   fields: {
     activities: "empty",
     location: "empty",
     city: "empty",
     state: "empty",
     date: "empty",
     time: "empty",
     name: "empty",
     email: "empty"

   }
 });

 //calendar date
 $('#calDate').calendar({
   type: 'date'

 });
 $('#calDate-input').calendar({
   type: 'date'

 });


 //calendar time
 $('#calTime').calendar({
   type: 'time'

 });
$(".ui.avatar.image").popup();
