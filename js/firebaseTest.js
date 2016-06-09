/*
    First you need to set your db variable, config variable which has the firebase information that 
    firebase provides for you. I added two elements here that are on my dom for ease-of-use. :)
*/
(function () {
    var db,
        config = {
            apiKey: "AIzaSyBAKvOR3I8qoZq-TjTXuIpfUqdQH1Pys9Q",
            authDomain: "example-a01c4.firebaseapp.com",
            databaseURL: "https://example-a01c4.firebaseio.com",
            storageBucket: "example-a01c4.appspot.com",
        },
        elMessages = document.querySelector(".messages"),
        elSendBtn = document.querySelector(".send");

    // Initialize your instance of firebase    
    firebase.initializeApp(config);

    //Store your instance in a variable;
    db = firebase.database();

    /*
        This is a firebase reference that grabs my json object and also by default refreshes the value on the page
        which I pass into the callback function. This is where all of the magic happens.
    */
    db.ref('messages/').on('value', function(snapshot) {
        var el = document.createElement('dl');
        
        for (var i = 0; i < snapshot.val().length; i++) {
            el.innerHTML += ("<dt>" + snapshot.val()[i].name + "</dt><dd>" + snapshot.val()[i].text + "</dd>");
        }
            elMessages.innerHTML = '';
            elMessages.appendChild(el);
    });

    /*
        You will most likely not need this, but this is an event listener for the click of the button I made
        It will save a new value into firebase. I did this to demonstrate how awesome it works. :)
    */
    elSendBtn.addEventListener("click", function () {
        db.ref('messages/' + 0 + '/name').set("James"); 
    });
})();