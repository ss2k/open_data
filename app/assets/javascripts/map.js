$(document).ready(function(){
    google.maps.event.addDomListener(window, 'load', initialize);

    var map;
    var markers = [];

    var userType = $("#user_data").data("type");

    // Add a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP
        });
        
        //marker.setIcon('http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-3875d7/shapecolor-white/shadow-1/border-color/symbolstyle-color/symbolshadowstyle-no/gradient-no/townhouse.png');
        if (userType == "owner"){
            marker.setIcon('https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|5|ff6600|ffff66|ffff66');
        }
        else {
            marker.setIcon('http://www.centralparknyc.org/assets/images/map-thumbs/service-facilities.png');
        }
        
        markers.push(marker);
    }

    function showPropertyMarkers(properties) {
        console.log(properties.length);

        //console.log(properties);
        //properties = [[19.3333, -99.2333],[19.3833, -99.2033],[19.28333, -99.3033],[19.2333, -99.1333],[19.4333, -99.2333],[19.4533, -99.1333]];
        for (var i = 0; i < 100; i++) {
            //console.log(properties[0], properties[1]);
            var propertyLatLng = new google.maps.LatLng(properties[i][1], properties[i][0]);
            addMarker(propertyLatLng);
        }
        showMarkers();
    }

    function getAllJSON(path, array_key, cb) {
        var jqxhr = $.getJSON(path, function() {
          console.log( "success" );
        })
        .done(function(res) {
            cb(res.data[array_key]);
        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            console.log( "complete" );
        });
    }

    function getAllTiles(cb) {
        return getAllJSON("tiles.json", "coordinates", cb);
    }

    function getAllCategories(cb) {
        return getAllJSON("/data/categories.json", "categories", cb);
    }

    function getAllZipcodes(cb) {
        return getAllJSON("/data/zipcode.json", "zipcodes", cb);
    }

    function getAllAgeDist(cb) {
        return getAllJSON("/data/age_dist_zipcode.json", "age_dist_tiles", cb);
    }

    function test(data){
        console.log(data);
    }

    function initialize() {

        var initialLon = -99.1333;
        var initialLat = 19.4333;
        var initialLatLon = new google.maps.LatLng(initialLat, initialLon);

        //Set up google map on div map-canvas centering around initial
        //latitude and longitude
        var mapOptions = {
            center: initialLatLon,
            zoom: 10
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        //add marker to initial latitude and longitude
        addMarker(initialLatLon);
        //showPropertyMarkers();
        //getAllCategories(test);
        getAllTiles(showPropertyMarkers);
        //getAllZipcodes(test);
        // getAllAgeDist(test);
    };

    // Sets the map on all markers in the array.
    function setAllMap(map) {
        for (var i=0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setAllMap(null);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setAllMap(map);
    }

    //use Google geocoding API to convert address to lat and lon
    function getLatLonFromAddress(search_text) {
        var api_call = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search_text;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", api_call, false);
        xhr.send();

        var location = JSON.parse(xhr.response)['results'][0];
        var location = location['geometry']['location'];

        return location;
    }

});