var Config = {
    apiKey: "AIzaSyBVJ6seSHRcs3BEAwNASXztrvrMa_KWzUI",
    authDomain: "my-project-2-84c64.firebaseapp.com",
    databaseURL: "https://my-project-2-84c64.firebaseio.com",
    projectId: "my-project-2-84c64",
    storageBucket: "",
    messagingSenderId: "542512001381",
    appId: "1:542512001381:web:cb105082606251dc81718c",
    measurementId: "G-DLMCSJXRYM"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = 0;



$(".btn").on("click", function (event) {
    event.preventDefault();


    trainName = $(".trainName").val().trim();
    destination = $(".destination").val().trim();
    trainTime = $(".trainTime").val().trim();
    frequency = $(".frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    $(".trainName").val('');
    $(".destination").val('');
    $(".trainTime").val('');
    $(".frequency").val('');

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
})
    database.ref().on("child_added", function (childSnapshot) {
        var trainName = childSnapshot.val().trainName
        var destination = childSnapshot.val().destination
        var frequency = childSnapshot.val().frequency
        var trainTime = childSnapshot.val().trainTime

        var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
        var minAway = frequency - timeRemainder;
        var nextArrival = moment().add(minAway, "m").format("hh:mm A");

        var newRow = $("<tr>").append(
            $("<th>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway),
        );
        $("#table").append(newRow);

    }, function(errorObject) {
        console.log("Errors handled:" + errorObject.code)
    });