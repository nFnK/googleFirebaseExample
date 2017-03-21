/*
    First you need to set your db variable, config variable which has the firebase information that 
    firebase provides for you. I added a few elements here that are on my dom for ease-of-use. :)
*/
(function () {
    var db,
        config = {
            apiKey: "AIzaSyBAKvOR3I8qoZq-TjTXuIpfUqdQH1Pys9Q",
            authDomain: "example-a01c4.firebaseapp.com",
            databaseURL: "https://example-a01c4.firebaseio.com",
            storageBucket: "example-a01c4.appspot.com",
        },
        elAlarmClock = document.querySelector(".alarm-wrapper img"),
        elOnOffAlarmBtn = document.querySelectorAll(".on-alarm, .off-alarm"),
        elAlarmSound = document.querySelector("#alarm-sound");

    // Initialize your instance of firebase    
    firebase.initializeApp(config);

    //Store your instance in a variable;
    db = firebase.database();

    /*
        This is a firebase reference that grabs my json object and by default refreshes the value on the page
        which I pass into the callback function. This is where all of the magic happens.
    */
    db.ref('AlarmFlag').on('value', function (snapshot) {
        if (snapshot.val() === 1) {
            elAlarmClock.className = "shake";
            elAlarmSound.innerHTML = "<audio autoplay loop>" +
                "<source src='sounds/play.mp3' type='audio/mpeg'>" +
                "</audio>";
        } else {
            elAlarmClock.classList.remove("shake");
            elAlarmSound.innerHTML = "";
        }
    });

    /*
       These are event listeners for the click of the buttons I made
       It will save a new value into firebase. I did this to demonstrate how awesome it works. :)
    */
    for (var i = 0 ; i < elOnOffAlarmBtn.length ; i++) {
        elOnOffAlarmBtn[i].addEventListener("click", function (e) {
            db.ref('AlarmFlag').set(parseInt(e.currentTarget.getAttribute("value")));
        });
    }
})();