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

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row = "<div class = 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addRoom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
console.log(name);
localStorage.setItem("room_name",name);
window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location = "index.html";
}