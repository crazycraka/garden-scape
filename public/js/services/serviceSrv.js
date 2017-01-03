gardenApp.service('serviceSrv', function($http){
    this.checkThis = 'this is a test coming form the serviceSrv';

    this.addPlan = function(selectedPlanId, userId){
         return $http({
            method: 'POST',
            url: '/addPlan',
            data: {
                selectedPlanId: selectedPlanId,
                userId: userId
            }
        }).then(function(response){
            return response
         }).catch(function(err){
             return err;
         })
    };

    this.planInfo = function(){
        return $http({
            method: 'GET',
            url: '/planInfo'
        }).then(function(response){
            return response.data;
        }).catch(function(err){
            return err;
        })
    }

    this.refreshUserInfo = function(email, password){
        return $http({
            method: 'POST',
            url: '/login/returningCust',
            data: {
                userEmail: email,
                userPassword: password
            }
        }).then(function(response){
            console.log('response in returningCust loginServ', response);
            return response.data;
        }).catch(function(err){
            alert(err);
        })
    }

});