/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the next arrival and frequency of arrivals.

//Initialize Firebase
var config = {
    apiKey: "AIzaSyACX-RcdWEuk_HyNUi2CvZPt3bDZpyiwb8",
    authDomain: "trainspotter-c88fc.firebaseapp.com",
    databaseURL: "https://trainspotter-c88fc.firebaseio.com",
    projectId: "trainspotter-c88fc",
    storageBucket: "trainspotter-c88fc.appspot.com",
    messagingSenderId: "48581114918"
};
firebase.initializeApp(config);

var database = firebase.database();

// function that pushes input to firebase
$('#addTrainBtn').on("click", function() {

  // acquire the user input
  var trainName = $("#trainInput").val().trim();
  var destination = $("#desInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#freqInput").val().trim();

  // hold the user input in an object
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // upload the data to firebase
  database.ref().push(newTrain);

  // clearing all the text boxes after every addition
  $("#trainInput").val("");
  $("#desInput").val("");
  $("#timeInput").val("");
  $("#freqInput").val("");

  // Prevent moving to new page
  return false;
});



//  Created a firebase event function for adding trains to the database and a row in the html when the user adds things
database.ref().on("child_added", function(event) {

  // store the values from the last function's newTrain object into variables
  var trainName = event.val().name;
  var destination = event.val().place;
  var firstTrain = event.val().ftrain;
  var frequency = event.val().freq;

  // first train matters since it's the basis for all the trains that come after it
  // first train pushed back to make sure it comes before current time
  // no negative numbers this way
  var firstTime = moment(firstTrain, "HH:mm");

  //store the time right now into a variable
  var currentTime = moment().format("HH:mm");

  // store difference between currentTime and first train converted in a variable.
  var timeDiff = moment().diff(moment(firstTime), "minutes");

  // find remainder of the time between arrivals and store in a variable
  var timeRemainder = timeDiff % frequency;

  // calculate minutes till train arrival and store it in a variable
  var minToTrain = frequency - timeRemainder;

  // next train
  var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nextTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case