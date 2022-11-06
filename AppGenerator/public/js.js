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
var x = document.getElementById("GeoLong");
var y = document.getElementById("GeoLat");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.setAttribute('value',0 );  
    y.setAttribute('value',0 );  }
}
function showPosition(position) {
  x.setAttribute('value' , position.coords.longitude);
  y.setAttribute('value', position.coords.latitude);
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
  // Get dog sitter ID from query param
  const params = new URLSearchParams(window.location.search);
  const dogSitterID = params.get("id");

  // Extract Rate 
  var s1Checked = document.getElementById("1").checked ? 1 : 0;
  var s2Checked = document.getElementById("2").checked ? 2 : 0;
  var s3Checked = document.getElementById("3").checked ? 3 : 0;
  var s4Checked = document.getElementById("4").checked ? 4 : 0;
  var s5Checked = document.getElementById("5").checked ? 5 : 0;
  var rank = s1Checked + s2Checked + s3Checked + s4Checked + s5Checked;
  // Build rquest body
  requestBody = {
    "id": dogSitterID,
    "rank": rank
  }
  // Send request to sever sendRank
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/sendRank");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(requestBody))
  // Show popup
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}





