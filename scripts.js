function style(feature) {
    return {
        fillColor: '#ddd',
        weight: 1,
        opacity: 1,
        color: '#fff',
        fillOpacity: 0.7
    };
}

var map = L.map('map', {zoomControl: false, minZoom: 6, attributionControl: ''}).setView([53, 2], 6);

L.tileLayer('https://{s}.tiles.mapbox.com/v4/zcutner.lh6ffdkk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiemN1dG5lciIsImEiOiJVQlVxRjZBIn0.E5naXpq89iZ5tqlBDgzhrQ').addTo(map);

L.geoJson(localAuthorities, {style: style}).addTo(map);

$('.nstSlider').nstSlider({
    "left_grip_selector": ".leftGrip",
    "value_changed_callback": function(cause, leftValue) {
        $('#year').text(leftValue);
    }
});
