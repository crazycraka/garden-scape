gardenApp.controller('listCustCtrl', function($scope, $http){

    $scope.test = 'listCustCtrl is working';
    let getUsers = function(){
        $http({
            method: 'GET',
            url: '/listall'
        }).then(function(response){
            $scope.originalCustList = response.data;
        })
    };
    getUsers();

    $scope.$watch('customers', function(){
       console.log('$scope.customers', $scope.customers);
    });

    $scope.routeFilter = (day) => {

        let selectedDayString = [];
        alert('hey this worked');
        console.log(day);
        for ( let key in day){
            console.log(key);
            selectedDayString.push(key);

        }

        console.log('selectedDayString', selectedDayString);

        $scope.customers = $scope.originalCustList.filter(function(currentVal, index, arr){
            console.log('currentVal.serviceday', currentVal.serviceday === selectedDayString);
            console.log(selectedDayString);
            if(selectedDayString[0] === currentVal.serviceday){
                console.log(currentVal);
                return currentVal;
            }
        })


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