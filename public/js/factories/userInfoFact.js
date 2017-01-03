gardenApp.factory('userInfoFact', function(){

    var userObject = {};

    var addCurrentUser = function(userData){
        userObject = userData;
    };
    var returnCurrentUser = function(){
        return userObject;
    };

    return {
        addCurrentUser: addCurrentUser,
        returnCurrentUser: returnCurrentUser
    }

});