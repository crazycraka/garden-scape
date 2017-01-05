gardenApp.controller('serviceCtrl', ($scope, serviceSrv) => {

if($scope.userProfileInfo) {
    let email = $scope.userProfileInfo.email;
    let password = $scope.userProfileInfo.password;
}

    $scope.addPlan = (selectedPlan, userId) => {
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



    $scope.getInfo = () => {
        serviceSrv.planInfo()
            .then( (response) => {
                $scope.planInfo = response;
            })
    };


    $scope.getInfo();


});