var roomCode;
var player1;
var player2;
var choice1;
var choice2;
var rps1Array = ["rock", "paper", "scissors"];
var rps2Array = ["rock2", "paper2", "scissors2"];
var refString1;
var refString2;

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
            if (!snapshot.child("Player1").exists()) {
                player1 = roomCode + "1";
                player2 = null;
                refString1 = roomCode + '/Player1';
                refString2 = null;
                database.ref(refString1).update({
                    player1ID: player1,
                    choice: 'empty'
                });
                alert("Hello, Player 1");
            } else if (!snapshot.child("Player2").exists()) {
                player2 = roomCode + "2";
                player1 = null;
                refString2 = roomCode + '/Player2';
                refString1 = null;
                database.ref(refString2).update({
                    player2ID: player2,
                    choice: 'empty'
                });
                alert("Hello, Player 2");
            } else {
                alert("Sorry, room full");
            }
        });
    }
}

function selectChoice(oneNot2, buttonID) {
    if (oneNot2) {
        if (buttonID == "#rock") {
            $(buttonID).addClass("active");
            $("#paper").removeClass("active");
            $("#scissors").removeClass("active");
        } else if (buttonID == "#paper") {
            $("#rock").removeClass("active");
            $(buttonID).addClass("active");
            $("#scissors").removeClass("active");
        } else if (buttonID == "#scissors") {
            $("#rock").removeClass("active");
            $("#paper").removeClass("active");
            $(buttonID).addClass("active");
        } else {
            $("#rock").removeClass("active");
            $("#paper").removeClass("active");
            $("#scissors").removeClass("active");
        }
    } else {
        if (buttonID == "#rock2") {
            $(buttonID).addClass("active");
            $("#paper2").removeClass("active");
            $("#scissors2").removeClass("active");
        } else if (buttonID == "#paper2") {
            $("#rock2").removeClass("active");
            $(buttonID).addClass("active");
            $("#scissors").removeClass("active");
        } else if (buttonID == "#scissors2") {
            $("#rock2").removeClass("active");
            $("#paper2").removeClass("active");
            $(buttonID).addClass("active");
        } else {
            $("#rock2").removeClass("active");
            $("#paper2").removeClass("active");
            $("#scissors2").removeClass("active");
        }
    }
}


$("#roomCodeBtn").on("click", function(event) {
    event.preventDefault();
    setUpRoom();
})

$(".choice").on("click", function() {
    var choice = $(this).attr("id");
    if (player1 != null) {
        if (rps1Array.includes(choice)) {
            console.log(player1, choice);
            database.ref(roomCode + '/Player1').update({
                choice: choice
            });
            selectChoice(player1, "#" + choice);
        } else {
            console.log("Cannot choose for player 2");
        }
    } else if (player2 != null) {
        if (rps2Array.includes(choice)) {
            console.log(player2, choice);
            database.ref(roomCode + '/Player2').update({
                choice: choice
            });
            selectChoice(false, "#" + choice);
        } else {
            console.log("Cannot choose for player 1");
        }
    }
})