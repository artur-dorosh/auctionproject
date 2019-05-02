/* maps */

function initMap() {
    var location = {lat: 50.4486136, lng: 30.4564757};
    var map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 17,
      disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP
    });
}


/* toTop */

window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 500) {
        document.getElementById("toTop").classList.add("active");
    } else {
        document.getElementById("toTop").classList.remove("active");
    }
}
