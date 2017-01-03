var app = require('../server.js');
var db = app.get('db');


module.exports = {
    listAll: function(req, res){
        db.customers(function(err, customers){
            if(err){
                res.send(err)
            } else {
                res.status(200).send(customers)
            }
        })

    },
    newCust: function(req, res){
        var cust = req.body;
        db.newCust([ cust.fname, cust.lname, cust.address, cust.email, cust.password], function(err, newCustomer){
            if(err){
                res.send(err)
            } else {
                res.send(newCustomer);
            }
        })
    },
    returningCust: function(req, res){
        var cust = req.body;
        db.returningCust([cust.userEmail, cust.userPassword], function(err, userData){
            if(err){
                res.send(err)
            } else {
                res.send(userData)
            }
        })
    },
    editProfile: function(req, res){
        var cust = req.body;
        db.editProfile( [cust.fname, cust.lname, cust.address, cust.email, cust.password, cust.id, cust.currentservice], function(err, updatedProfile){
            if(err){
                res.send(err)
            } else {
                res.send(updatedProfile)
            }
        })
    },
    planInfo: function(req, res){
        db.planInfo( function(err, planInfo){
            if(err){
                res.send(err)
            }else {
                res.send(planInfo)
            }
        })
    },
    addPlan: function(req, res){

        db.addPlan( [ req.body.selectedPlanId, req.body.userId], function(err, addPlan){
            if(err){
                res.send(err)
            } else {
                res.send(addPlan)
            }
        })
    }
};