gardenApp.controller('serviceCtrl', function($scope, serviceSrv){

if($scope.userProfileInfo) {
    var email = $scope.userProfileInfo.email;
    var password = $scope.userProfileInfo.password;
}

    $scope.addPlan = function(selectedPlan, userId){
        alert('you selected the ' + selectedPlan.servname + ' plan, it will be added to your account');
        serviceSrv.addPlan(selectedPlan.id, userId)
            .then(function(response){
                return response;
        });
        serviceSrv.refreshUserInfo(email, password)
            .then(function(response){
                $scope.userProfileInfo.currentservice = response[0].currentservice;
                return response;
            })

    };



    $scope.getInfo = function(){
        serviceSrv.planInfo()
            .then(function(response){
                $scope.planInfo = response;
            })
    };


    $scope.getInfo();


});