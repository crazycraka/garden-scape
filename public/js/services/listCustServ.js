/**
 * Created by scott on 1/4/17.
 */

gardenApp.service('listCustServ', function($http){

    // this.getUsers = () => {
    //     $http({
    //         method: 'GET',
    //         url: '/listall'
    //     }).then(function(response){
    //         // $scope.originalCustList = response.data;
    //         return response.data
    //     })
    // };


    this.serviceStatus = (customer) => {
        alert('congrats, you logged this service!');
        $http({
            method: 'POST',
            url: '/serviceStatus',
            data: {
                customerid: customer.id,
                customernote: customer.note,
                servicestatus: customer.servicestatus,
                customer: customer.fname
            }
        }).then( function(response){
            console.log('listCustServ response', response);
            return response
        }).catch( function(err){
            console.log(err);
        })

    };

    this.adminCustUpdate = (customer) => {
        $http({
            method: 'POST',
            url: '/adminCustUpdate',
            data: {
                fname: customer.fname,
                lname: customer.lname,
                address: customer.address,
                email: customer.email,
                currentservice: customer.currentservice,
                password: customer.password,
                assignedtech: customer.assignedtech,
                serviceday: customer.serviceday,
                servicetime: customer.servicetime,
                id: customer.id
            }
        }).then( (response) => {
            console.log('response in adminCustUpdate .then', response);
            alert('update complete');
            return response;
        }).catch( (err) => {
            console.log(err);
        })
    }

});