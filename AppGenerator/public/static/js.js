
function Topnav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// passwords confirmation
var PswValid=function() {
  if (document.getElementById('pswd1').value ==
    document.getElementById('pswd2').value) {
    document.getElementById('messagePsw').innerHTML = '';
  } else {
    document.getElementById('messagePsw').innerHTML = 'Passwords dont match';
  }
}

// geolocation
var x = document.getElementById("demo");
function getLocation() {
  console.log("in geo 100");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("in geo 1");
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  console.log("in geo 2");
}
function searchT(){
  $(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
}

// When the user clicks on send rank, open the popup
function sendRank() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("email");

if (localStorage.checkbox && localStorage.checkbox !== "") {
  rmCheck.setAttribute("checked", "checked");
  emailInput.value = localStorage.username;
} else {
  rmCheck.removeAttribute("checked");
  emailInput.value = "";
}

function lsRememberMe() {
  if (rmCheck.checked && emailInput.value !== "") {
    localStorage.username = emailInput.value;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}


