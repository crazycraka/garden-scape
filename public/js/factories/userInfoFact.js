gardenApp.factory('userInfoFact', function(){

    let userObject = {};

    let addCurrentUser = function(userData){
        userObject = userData;
    };
    let returnCurrentUser = function(){
        return userObject;
    };

    return {
        addCurrentUser: addCurrentUser,
        returnCurrentUser: returnCurrentUser
    }

});