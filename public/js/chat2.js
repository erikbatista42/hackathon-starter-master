$(document).ready(function () {
    if (inIframe) {
        $('#usernameModal').modal('show');
    }
});

function inIframe() {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}
var config = {
    apiKey: "AIzaSyBH-bdbE-D9ahSvw-HqUpDjhyVGA52IAnI"
    , authDomain: "lewhacks02.firebaseapp.com"
    , databaseURL: "https://lewhacks02.firebaseio.com"
    , storageBucket: "lewhacks02.appspot.com"
    , messageingSenderId: "905536999305"
};
firebase.initializeApp(config);
var chatData = firebase.database().ref();
//Function that when you press enter after typing a message 
//	to the Firebase reference to be stored within the database
chatData.on("child_added", showMessage);

function showMessage(msg) {
    var message = msg.val();
    var messageSender = message.name;
    var messageContent = message.text;
    $printer.append("<div>" + messageSender + ": " + messageContent + "</div>");
    scrollBottom(); // DO ON NEW MESSAGE (AJAX)
}
var $chat = $('.chat')
    , $printer = $('.messages', $chat)
    , $textArea = $("#message", $chat)
    , $postBtn = $('button', $chat)
    , printerH = $printer.innerHeight()
    , preventNewScroll = false;
//// SCROLL BOTTOM  
function scrollBottom() {
    if (!preventNewScroll) { // if mouse is not over printer
        $printer.stop().animate({
            scrollTop: $printer[0].scrollHeight - printerH
        }, 600); // SET SCROLLER TO BOTTOM
    }
}
scrollBottom(); // DO IMMEDIATELY
function postMessage2(e) {
    // on Post click or 'enter' but allow new lines using shift+enter
    if (e.type == 'click' || (e.which == 13 && !e.shiftKey)) {
        e.preventDefault();
        var msg = $("#message").val(); // not empty / space
        if ($.trim(msg)) {
            $("#message").val(''); // CLEAR TEXTAREA
            scrollBottom(); // DO ON POST
            chatData.push({
                name: document.getElementById("username").value
                , text: msg
            });
        }
    }
}
//// PREVENT SCROLL TO BOTTOM WHILE READING OLD MESSAGES
$printer.hover(function (e) {
    preventNewScroll = e.type == 'mouseenter' ? true : false;
    if (!preventNewScroll) {
        scrollBottom();
    } // On mouseleave go to bottom
});
$textArea.keyup(postMessage2);