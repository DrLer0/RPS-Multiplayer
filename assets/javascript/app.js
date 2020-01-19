var roomCode;
var player1;
var player2;
var choice1;
var choice2;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD6wzZqJyvPr8cHSRzQIo_GbvJeIZ_ncF4",
    authDomain: "rpsgame-929ec.firebaseapp.com",
    databaseURL: "https://rpsgame-929ec.firebaseio.com",
    projectId: "rpsgame-929ec",
    storageBucket: "rpsgame-929ec.appspot.com",
    messagingSenderId: "1029948779307",
    appId: "1:1029948779307:web:48df6ef6bcbdfd757df36e",
    measurementId: "G-3ZJFVV97WL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function setUpRoom() {
    roomCode = $("#roomCode").val().trim();
    if (roomCode == "") {
        alert("room code cannot be empty")
    } else {
        database.ref(roomCode).once("value", function(snapshot) {
            console.log(snapshot);
            if (!snapshot.child("player1ID").exists()) {
                player1 = roomCode + "1";
                database.ref(roomCode).update({
                    player1ID: player1
                });
            } else if (!snapshot.child("player2ID").exists()) {
                player2 = roomCode + "2";
                database.ref(roomCode).update({
                    player2ID: player2
                });
            } else {
                alert("Sorry, room full");
            }
        });
    }
}

$("#roomCodeBtn").on("click", function(event) {
    event.preventDefault();
    setUpRoom();
})

$(".choice").on("click", function() {
    console.log($(this).attr("id"));
    console.log(player1, player2);
})