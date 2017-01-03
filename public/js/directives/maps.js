/**
 * Created by scott on 1/1/17.
 */
//this directive works, just not sure yet how to incorporate dynamic marker/routes
gardenApp.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        console.log('myMap directive scope ' , scope);
        var map, infoWindow;
        var markers = [];
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(40.227453, -111.659166),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
        // init the map
        function initMap() {
            // console.log($scope.customers + 'in myMap $scope.customers');

            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title
                // icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        var geocoder = new google.maps.Geocoder();


        // var thingy = {'address': '8044 Coolidge St'};
        // geocoder.geocode( {'address': '8044 Coolidge St'}, function(results, status){
        //     var addr_type = results[0].types[0]; //type of address that was geocoded
        //     if(status == google.maps.GeocoderStatus.OK){
        //         ShowLocation( results[0].geometry.location, address, addr_type)
        //     }
        //     else {
        //         alert("Gecode was not successful for the following reason: " + status);
        //     }
        // });


        var listCheck = scope.$watch('customers', function(){
            // alert(scope.customers);
            if(scope.customers){
                for(var i = 0; i < scope.customers.length; i++){
                    //addres and customerSummary need to use ES6 let, instead of var, for infoWindows to have dynamic content, unkown reasons
                    let address = {"address": scope.customers[i].address };
                    let customerSummary = scope.customers[i].fname + " " + scope.customers[i].lname + " service: " + scope.customers[i].currentservice;
                    // console.log();
                    geocoder.geocode( address, function(results, status){
                        scope.results = results;
                        // console.log('results', results);
                        // var addr_type = results[0].types[0]; //type of address that was geocoded
                        if(status == google.maps.GeocoderStatus.OK){
                            // console.log('----------------' , results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            // ShowLocation( results[0].geometry.location, JSON.stringify({ address: '62 w 300 n, salt lake city, ut' }), customerSummary); //addr_type)
                            setMarker(map, new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()), 'check this out', customerSummary);
                            // setMarker(map , new google.maps.LatLng)
                        }
                        else {
                            alert("Geocode was not successful for the following reason: " + status);
                        }
                    });


                }
            }
        });


        // function ShowLocation( latlng, address, customerSummary)
        // {
        //     // Center the map at the specified location
        //     map.setCenter( latlng );
        //
        //     // Set the zoom level according to the address level of detail the user specified
        //     var zoom = 12;
        //     // switch ( addr_type )
        //     // {
        //     //     case "administrative_area_level_1"	: zoom = 6; break;		// user specified a state
        //     //     case "locality"						: zoom = 10; break;		// user specified a city/town
        //     //     case "street_address"				: zoom = 15; break;		// user specified a street address
        //     // }
        //     map.setZoom( zoom );
        //
        //     // Place a Google Marker at the same location as the map center
        //     // When you hover over the marker, it will display the title
        //     var marker = new google.maps.Marker( {
        //         position: latlng,
        //         map: map,
        //         title: address
        //     });
        //
        //     // Create an InfoWindow for the marker
        //     var contentString = "<b>hi" + customerSummary + "</b>";	// HTML text to display in the InfoWindow
        //     var infowindow = new google.maps.InfoWindow( { content: contentString } );
        //
        //     // Set event to display the InfoWindow anchored to the marker when the marker is clicked.
        //     google.maps.event.addListener( marker, 'click', function() { infowindow.open( map, marker ); });
        // }

        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});
