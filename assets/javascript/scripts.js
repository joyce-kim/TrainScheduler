var config = {
    apiKey: "AIzaSyCBND6XlxMNYGsQgECejtLYy0Dwg-u8iBQ",
    authDomain: "train-schedul-b4b46.firebaseapp.com",
    databaseURL: "https://train-schedul-b4b46.firebaseio.com",
    projectId: "train-schedul-b4b46",
    storageBucket: "train-schedul-b4b46.appspot.com",
    messagingSenderId: "1076130346307"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#my-form").on("submit", function() {
	event.preventDefault();

    var nameInput = $("#name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var timeInput = $("#time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

	database.ref().push({
	    Name: nameInput,
	    Destination: destinationInput,
	    FirstTime: timeInput,
	    Frequency: frequencyInput
	});

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	var trainName = childSnapshot.val().Name;
	var trainDest = childSnapshot.val().Destination;
	var trainFirst = childSnapshot.val().FirstTime;
	var trainFrequency = childSnapshot.val().Frequency;

	var parsedFirst = moment(trainFirst, "HH:mm");
	var currentTime = moment();

	var minutesAway = trainFrequency - (moment(currentTime).diff(moment(parsedFirst), "minutes") % trainFrequency);
	
	var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("HH:mm");
	
	var trainItem = $("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + 
    		trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

	$("#insert-schedules-here").append(trainItem);
});