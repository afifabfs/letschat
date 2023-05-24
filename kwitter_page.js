var firebaseConfig = {
    apiKey: "AIzaSyCUijSmsngYN3Pxsy9Y_4QuP_-8yLcvC90",
    authDomain: "kwitter-3016d.firebaseapp.com",
    databaseURL: "https://kwitter-3016d-default-rtdb.firebaseio.com",
    projectId: "kwitter-3016d",
    storageBucket: "kwitter-3016d.appspot.com",
    messagingSenderId: "805063488304",
    appId: "1:805063488304:web:e7d6ac47e29b79a9284ef5",
};

firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name"); 
room_name = localStorage.getItem("room_name");
 console.log(room_name);
function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name1 = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];

                name_with_tag = "<h4>" + name1 + "<img class = 'user_tick' src = 'tick.png'></h4>";
                message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
                like_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value = " + like + " onclick = 'updateLike(this.id)'>";
                span_with_tag = "<span class = 'glyphicon glyphicon-thumps_up'>Like : " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();


function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}