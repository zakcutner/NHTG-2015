var year = 1992;
var election = 1992;

function getColour(feature) {
    if(election in feature.properties.mps) {
        if('labour' in feature.properties.mps[election]) var labour = feature.properties.mps[election].labour;
        else var labour = 0;
        if('conservative' in feature.properties.mps[election]) var conservative = feature.properties.mps[election].conservative;
        else var conservative = 0;
        if('liberal' in feature.properties.mps[election]) var liberal = feature.properties.mps[election].liberal;
        else var liberal = 0;
        if('other' in feature.properties.mps[election]) var other = feature.properties.mps[election].other;
        else var other = 0;

        var colour = [];
        colour[0] = (labour * 255) + (conservative * 0) + (liberal * 255) + (other * 0);
        colour[1] = (labour * 0) + (conservative * 0) + (liberal * 255) + (other * 255);
        colour[2] = (labour * 0) + (conservative * 255) + (liberal * 0) + (other * 0);

        console.log('rgb(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ')');
        return 'rgb(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ')';
    }
    else return 'rgb(238, 238, 238)';
}

function style(feature) {
    return {
        fillColor: getColour(feature),
        weight: 1,
        color: '#fff',
        fillOpacity: 1 - feature.properties.lifeexp[year]
    };
}

var map = L.map('map', {zoomControl: false, minZoom: 6, maxZoom: 10, attributionControl: ''}).setView([53.2, -4], 6);

L.tileLayer('https://{s}.tiles.mapbox.com/v4/zcutner.lh6ffdkk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiemN1dG5lciIsImEiOiJVQlVxRjZBIn0.E5naXpq89iZ5tqlBDgzhrQ').addTo(map);

L.geoJson(localAuthorities, {style: style}).addTo(map);

$('.nstSlider').nstSlider({
    "left_grip_selector": ".leftGrip",
    "value_changed_callback": function(cause, leftValue) {
        year = leftValue;

        if(year >= 1992) election = 1992;
        if(year >= 1997) election = 1997;
        if(year >= 2001) election = 2001;
        if(year >= 2005) election = 2005;
        if(year >= 2010) election = 2010;

        $('#year').text(year);
        L.geoJson(localAuthorities, {style: style}).addTo(map);
    }
});
