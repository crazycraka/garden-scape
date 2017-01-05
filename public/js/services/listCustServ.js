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

    }

});