$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDuZWY-9k-kFp6KB8qsddn-NtY5mkHuZ2E",
        authDomain: "train-scheduler-ad4c7.firebaseapp.com",
        databaseURL: "https://train-scheduler-ad4c7.firebaseio.com",
        projectId: "train-scheduler-ad4c7",
        storageBucket: "train-scheduler-ad4c7.appspot.com",
        messagingSenderId: "325216875241"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function () {
        event.preventDefault();

        database.ref().push({
            name: $("#name").val().trim(),
            destination: $("#destination").val().trim(),
            time: $("#time").val().trim(),
            frequency: $("#frequency").val().trim()
        });
    });

    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();

        var firstTrainTimeConverted = moment(sv.time, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
        var timeRemainder = diffTime % parseInt(sv.frequency);
        var minutes = parseInt(sv.frequency) - timeRemainder;
        var nextArrival = moment().add(minutes, "m").format("hh:mm A");

        var newRow = $("<tr>");

        var nameCell = $("<td class='name' contenteditable='false'>").text(sv.name);
        var destinationCell = $("<td class='destination' contenteditable='false'>").text(sv.destination);
        var frequencyCell = $("<td>").text(sv.frequency);
        var nextArrivalCell = $("<td class='nextArrival' contenteditable='false'>").text(nextArrival);
        var minutesAwayCell = $("<td>").text(minutes);
        // var btns = $("<td>").html('<button type="button" class="btn btn-primary btn-sm update">Update</button> <button type="button" class="btn btn-primary btn-sm remove">Remove</button>');

        newRow.append(nameCell, destinationCell, frequencyCell, nextArrivalCell, minutesAwayCell);

        $("table").append(newRow);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    /* uncompleted bonus challenges
    function contentEdit(td) {
        if (td.attr("contenteditable") === "false") {
            td.attr("contenteditable", true);
        } else {
            td.attr("contenteditable", false);
        }
    }

    $(document).on("click", ".update", function () {
        var tdName = $(this).parent().siblings(".name");
        var tdDest = $(this).parent().siblings(".destination");
        var tdArrival = $(this).parent().siblings(".nextArrival");

        contentEdit(tdName);
        contentEdit(tdDest);
        contentEdit(tdArrival);

        // update to database without submitting new line
        // database.ref().set({
        //     name: tdName.text(),
        //     destination: tdDest.text(),
        //     time: tdArrival.text()
        // })

        var key = Object.keys(snapshot.val());

        for (var i=0; i<key.length; i++) {
            console.log(key[i]);
        }

        // update minutes away

    });

    // delete on click
    $(document).on("click", ".remove", function() {
        $(this).parentsUntil("tbody").remove();

        // need to find the key of the data in that row
        // match name to #name?

    });
    */
});