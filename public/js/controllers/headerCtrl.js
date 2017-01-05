gardenApp.controller('headerCtrl', function($scope, $http, $rootScope, userInfoFact){

    $rootScope.$on('userLoggedIn', () => {
        let link = 'welcome ' + userInfoFact.returnCurrentUser().fname;
        $scope.greeting = link;
        $rootScope.userProfileInfo = userInfoFact.returnCurrentUser();
    });

 });


// userInfoFact.returnCurrentUser().fname