gardenApp.controller('loginCtrl', function($scope, $http, loginServ, $rootScope, userInfoFact) {


    $scope.newCust =  (fname, lname, address, email, password) => {
        if(fname && lname && address && email && password) {
            loginServ.newCust(fname, lname, address, email, password)
                .then(function (response) {});
        }
        else {
            alert('sorry, please fill in all fields, their all actually pretty important');
        }
        $scope.fname = '';
        $scope.lname = '';
        $scope.address = '';
        $scope.email = '';
        $scope.password = '';
        $scope.currentservice = '';


    };

    $scope.returningCust = (userEmail, userPassword) => {
        if(userEmail && userPassword){
            loginServ.returningCust(userEmail, userPassword)
                .then(function(response){
                    $scope.userInfo = response;
                    console.log('in returningCust loginCtrl, response[0]', response[0]);
                    userInfoFact.addCurrentUser(response[0]);
                    $rootScope.$broadcast('userLoggedIn');
                })
        }
        else {
            alert('sorry, to validate login you need a email and a password entry');
        }
        $scope.userEmail = '';
        $scope.userPassword = '';
    };

    $scope.editProfile =  (fname, lname, address, email, password, id, currentservice) => {
        if(fname && lname && address && email && password && currentservice) {
            loginServ.editProfile(fname, lname, address, email, password, id, currentservice)
                .then(function (response) {
                    $scope.userProfileInfo.fname = loginServ.editFirstName;
                    $scope.userProfileInfo.lname = loginServ.editLastName;
                    $scope.userProfileInfo.address = loginServ.editAddress;
                    $scope.userProfileInfo.email = loginServ.editEmail;
                    $scope.userProfileInfo.password = loginServ.editPassword;
                    $scope.userProfileInfo.currentservice = loginServ.editCurrentService;
                });
        }
        else {
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