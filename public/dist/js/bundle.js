'use strict';

var gardenApp = angular.module('gardenApp', ['ui.router']);

gardenApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('homeView', {
        url: '/home',
        templateUrl: './html/homeView.html'
    }).state('serviceView', {
        url: '/service',
        templateUrl: './html/serviceView.html',
        controller: 'headerCtrl'
    }).state('aboutView', {
        url: '/about',
        templateUrl: './html/aboutView.html'
    }).state('loginReturnCustView', {
        url: '/login/returningCust',
        templateUrl: './html/loginReturnCustView.html',
        controller: 'loginCtrl'
    }).state('loginNewCustView', {
        url: '/login/newCust',
        templateUrl: './html/loginNewCustView.html',
        controller: 'loginCtrl'
    }).state('profileEdit', {
        url: '/profileEdit',
        templateUrl: './html/profileEdit.html',
        controller: 'loginCtrl'
    }).state('listCustView', {
        url: '/listCustView',
        templateUrl: './html/listCustView.html',
        controller: 'listCustCtrl'
    }).state('routeView', {
        url: '/routeView',
        templateUrl: './html/routeView.html',
        controller: 'listCustCtrl'
    });
});
'use strict';

gardenApp.controller('custAccountCtrl', function ($scope) {

    $scope.test = 'custAccountCtrl is working';
});
'use strict';

gardenApp.controller('dailyRouteCtrl', function ($scope) {

    $scope.test = 'dailyRouteCtrl is working';
});
'use strict';

gardenApp.controller('gMapsCtrl', function ($scope) {

    $scope.test = 'gMapsCtrl is working';
});
'use strict';

gardenApp.controller('headerCtrl', function ($scope, $http, $rootScope, userInfoFact) {

    $rootScope.$on('userLoggedIn', function () {
        var link = 'welcome ' + userInfoFact.returnCurrentUser().fname;
        $scope.greeting = link;
        $rootScope.userProfileInfo = userInfoFact.returnCurrentUser();
    });
});

// userInfoFact.returnCurrentUser().fname
"use strict";
'use strict';

gardenApp.controller('listCustCtrl', function ($scope, $http) {

    $scope.test = 'listCustCtrl is working';
    var getUsers = function getUsers() {
        $http({
            method: 'GET',
            url: '/listall'
        }).then(function (response) {
            $scope.originalCustList = response.data;
        });
    };
    getUsers();

    $scope.$watch('customers', function () {
        console.log('$scope.customers', $scope.customers);
    });

    $scope.routeFilter = function (day) {

        var selectedDayString = [];
        alert('hey this worked');
        console.log(day);
        for (var key in day) {
            console.log(key);
            selectedDayString.push(key);
        }

        console.log('selectedDayString', selectedDayString);

        $scope.customers = $scope.originalCustList.filter(function (currentVal, index, arr) {
            console.log('currentVal.serviceday', currentVal.serviceday === selectedDayString);
            console.log(selectedDayString);
            if (selectedDayString[0] === currentVal.serviceday) {
                console.log(currentVal);
                return currentVal;
            }
        });
    };

    //      $scope.initMap = function initMap() {
    // //                var headQuarters = {lat: -25.363, lng: 131.044};
    //
    //         $scope.map = new google.maps.Map(document.getElementById('map'), {
    //             zoom: 11,
    //             mapTypeId: 'roadmap'
    //         });
    //         console.log($scope.customers);
    //         // for(var i = 0; i < $scope.customers.length; i++){
    //         //     var marker = new google.maps.Marker({
    //         //         position: { lat: 40.24, lng: -111.65 },
    //         //         map: $scope.map
    //         //     });
    //         // }
    //         var marker = new google.maps.Marker({
    //            position: { lat: 40.3, lng: -111.5},
    //            map: $scope.map
    //         });
    //
    //         $scope.infoWindow = new google.maps.InfoWindow({map: $scope.map});
    //         function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //            infoWindow.setPosition(pos);
    //            infoWindow.setContent(browserHasGeolocation ?
    //                 'Error: The Geolocation service failed.' :
    //                 'Error: Your browser doesn\'t support geolocation.');
    //         }
    //
    //         // Try HTML5 geolocation.
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(function(position) {
    //                 $scope.pos = {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 };
    //                 $scope.currentPosition = new google.maps.Marker({
    //                     position: $scope.pos,
    //                     map: $scope.map
    //                 });
    //
    //                 $scope.infoWindow.setPosition($scope.pos);
    //                 $scope.infoWindow.setContent('Location found.');
    //                 $scope.map.setCenter($scope.pos);
    //             }, function() {
    //                 handleLocationError(true, $scope.infoWindow, $scope.map.getCenter());
    //             });
    //         } else {
    //             // Browser doesn't support Geolocation
    //             handleLocationError(false, $scope.infoWindow, $scope.map.getCenter());
    //         }
    //
    //
    //     };

    // $scope.initMap();
});
'use strict';

gardenApp.controller('loginCtrl', function ($scope, $http, loginServ, $rootScope, userInfoFact) {

    $scope.newCust = function (fname, lname, address, email, password) {
        if (fname && lname && address && email && password) {
            loginServ.newCust(fname, lname, address, email, password).then(function (response) {});
        } else {
            alert('sorry, please fill in all fields, their all actually pretty important');
        }
        $scope.fname = '';
        $scope.lname = '';
        $scope.address = '';
        $scope.email = '';
        $scope.password = '';
        $scope.currentservice = '';
    };

    $scope.returningCust = function (userEmail, userPassword) {
        if (userEmail && userPassword) {
            loginServ.returningCust(userEmail, userPassword).then(function (response) {
                $scope.userInfo = response;
                console.log('in returningCust loginCtrl, response[0]', response[0]);
                userInfoFact.addCurrentUser(response[0]);
                $rootScope.$broadcast('userLoggedIn');
            });
        } else {
            alert('sorry, to validate login you need a email and a password entry');
        }
        $scope.userEmail = '';
        $scope.userPassword = '';
    };

    $scope.editProfile = function (fname, lname, address, email, password, id, currentservice) {
        if (fname && lname && address && email && password && currentservice) {
            loginServ.editProfile(fname, lname, address, email, password, id, currentservice).then(function (response) {
                $scope.userProfileInfo.fname = loginServ.editFirstName;
                $scope.userProfileInfo.lname = loginServ.editLastName;
                $scope.userProfileInfo.address = loginServ.editAddress;
                $scope.userProfileInfo.email = loginServ.editEmail;
                $scope.userProfileInfo.password = loginServ.editPassword;
                $scope.userProfileInfo.currentservice = loginServ.editCurrentService;
            });
        } else {
            alert('sorry, please fill in all fields, to update your profile all fields need to be filled in');
        }
        $scope.fname = '';
        $scope.lname = '';
        $scope.address = '';
        $scope.email = '';
        $scope.password = '';
        $scope.currentservice = '';
    };
});
"use strict";

gardenApp.controller;
'use strict';

gardenApp.controller('serviceCtrl', function ($scope, serviceSrv) {

    if ($scope.userProfileInfo) {
        var email = $scope.userProfileInfo.email;
        var password = $scope.userProfileInfo.password;
    }

    $scope.addPlan = function (selectedPlan, userId) {
        alert('you selected the ' + selectedPlan.servname + ' plan, it will be added to your account');
        serviceSrv.addPlan(selectedPlan.id, userId).then(function (response) {
            return response;
        });
        serviceSrv.refreshUserInfo(email, password).then(function (response) {
            $scope.userProfileInfo.currentservice = response[0].currentservice;
            return response;
        });
    };

    $scope.getInfo = function () {
        serviceSrv.planInfo().then(function (response) {
            $scope.planInfo = response;
        });
    };

    $scope.getInfo();
});
'use strict';

/**
 * Created by scott on 1/1/17.
 */
//this directive works, just not sure yet how to incorporate dynamic marker/routes
gardenApp.directive('myMap', function () {
    // directive link function
    var link = function link(scope, element, attrs) {
        // console.log('myMap directive scope ' , scope);
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


        var listCheck = scope.$watch('customers', function () {
            // alert(scope.customers);
            if (scope.customers) {
                var _loop = function _loop() {
                    //addres and customerSummary need to use ES6 let, instead of var, for infoWindows to have dynamic content, unkown reasons
                    var address = { "address": scope.customers[i].address };
                    var customerSummary = scope.customers[i].fname + " " + scope.customers[i].lname + " service: " + scope.customers[i].currentservice;
                    // console.log();
                    geocoder.geocode(address, function (results, status) {
                        scope.results = results;
                        // console.log('results', results);
                        // var addr_type = results[0].types[0]; //type of address that was geocoded
                        if (status == google.maps.GeocoderStatus.OK) {
                            // console.log('----------------' , results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            // ShowLocation( results[0].geometry.location, JSON.stringify({ address: '62 w 300 n, salt lake city, ut' }), customerSummary); //addr_type)
                            setMarker(map, new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()), 'check this out', customerSummary);
                            // setMarker(map , new google.maps.LatLng)
                        } else {
                            alert("Geocode was not successful for the following reason: " + status);
                        }
                    });
                };

                for (var i = 0; i < scope.customers.length; i++) {
                    _loop();
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
'use strict';

gardenApp.service('loginServ', function ($http) {

    this.newCust = function (fname, lname, address, email, password) {
        return $http({
            method: "POST",
            url: '/login/newCust',
            data: {
                fname: fname,
                lname: lname,
                address: address,
                email: email,
                password: password
            }
        }).then(function (response) {
            alert('congrats, you registered an account! PLEASE LOG IN');
            return response;
        }).catch(function (err) {
            alert(err);
        });
    };

    this.returningCust = function (userEmail, userPassword) {
        return $http({
            method: 'POST',
            url: '/login/returningCust',
            data: {
                userEmail: userEmail,
                userPassword: userPassword
            }
        }).then(function (response) {
            console.log('response in returningCust loginServ', response);
            return response.data;
        }).catch(function (err) {
            alert(err);
        });
    };

    this.editFirstName;
    this.editLastName;
    this.editAddress;
    this.editEmail;
    this.editPassword;
    this.editCurrentService;
    this.editProfile = function (fname, lname, address, email, password, id, currentservice) {
        this.editFirstName = fname;
        this.editLastName = lname;
        this.editAddress = address;
        this.editEmail = email;
        this.editPassword = password;
        this.editCurrentService = currentservice;
        return $http({
            method: "POST",
            url: '/editProfile',
            data: {
                fname: fname,
                lname: lname,
                address: address,
                email: email,
                password: password,
                id: id,
                currentservice: currentservice
            }
        }).then(function (response) {
            alert('congrats, you updated your profile! ');
            console.log("response from editProfile response", response);
            return response;
        }).catch(function (err) {
            alert(err);
        });
    };
});
'use strict';

gardenApp.service('serviceSrv', function ($http) {
    this.checkThis = 'this is a test coming form the serviceSrv';

    this.addPlan = function (selectedPlanId, userId) {
        return $http({
            method: 'POST',
            url: '/addPlan',
            data: {
                selectedPlanId: selectedPlanId,
                userId: userId
            }
        }).then(function (response) {
            return response;
        }).catch(function (err) {
            return err;
        });
    };

    this.planInfo = function () {
        return $http({
            method: 'GET',
            url: '/planInfo'
        }).then(function (response) {
            return response.data;
        }).catch(function (err) {
            return err;
        });
    };

    this.refreshUserInfo = function (email, password) {
        return $http({
            method: 'POST',
            url: '/login/returningCust',
            data: {
                userEmail: email,
                userPassword: password
            }
        }).then(function (response) {
            console.log('response in returningCust loginServ', response);
            return response.data;
        }).catch(function (err) {
            alert(err);
        });
    };
});
'use strict';

gardenApp.factory('userInfoFact', function () {

    var userObject = {};

    var addCurrentUser = function addCurrentUser(userData) {
        userObject = userData;
    };
    var returnCurrentUser = function returnCurrentUser() {
        return userObject;
    };

    return {
        addCurrentUser: addCurrentUser,
        returnCurrentUser: returnCurrentUser
    };
});
//# sourceMappingURL=bundle.js.map
