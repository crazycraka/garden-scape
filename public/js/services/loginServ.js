gardenApp.service('loginServ', function($http){





    this.newCust = function(fname, lname, address, email, password){
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
        }).catch(function(err){
            alert(err);
        })
    };

    this.returningCust = function(userEmail, userPassword){
        return $http({
            method: 'POST',
            url: '/login/returningCust',
            data: {
                userEmail: userEmail,
                userPassword: userPassword
            }
        }).then(function(response){
            console.log('response in returningCust loginServ', response);
             return response.data;
        }).catch(function(err){
            alert(err);
        })
    };

    this.editFirstName;
    this.editLastName;
    this.editAddress;
    this.editEmail;
    this.editPassword;
    this.editCurrentService;

    this.editProfile = function(fname, lname, address, email, password, id, currentservice){
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
        }).catch(function(err){
            alert(err);
        })
    };









});