const req = require("express/lib/request");

window.addEventListener('load', function () {
    getLocation();
  });

function showPosition(position) {
    // alert(parseDouble(position.coords.latitude));
  
    var lat, long;
    lat = parseFloat(position.coords.latitude).toString();
    long = parseFloat(position.coords.longitude).toString();
    var newStr = "?Latitude="+lat+"&Longitude="+long;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", newStr, true);
    xhr.send();
}

function getLocation() {



    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
        var x = document.getElementsByTagName('body');
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }