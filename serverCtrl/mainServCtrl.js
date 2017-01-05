let app = require('../server.js');
let db = app.get('db');


module.exports = {
    listAll: function(req, res){
        db.customers( (err, customers) => {
            if(err){
                res.send(err)
            } else {
                res.status(200).send(customers)
            }
        })

    },
    newCust: (req, res) => {
        let cust = req.body;
        db.newCust([ cust.fname, cust.lname, cust.address, cust.email, cust.password], (err, newCustomer) => {
            if(err){
                res.send(err)
            } else {
                res.send(newCustomer);
            }
        })
    },
    returningCust: (req, res) =>{
        let cust = req.body;
        db.returningCust([cust.userEmail, cust.userPassword], (err, userData) => {
            if(err){
                res.send(err)
            } else {
                res.send(userData)
            }
        })
    },
    editProfile: (req, res) => {
        let cust = req.body;
        db.editProfile( [cust.fname, cust.lname, cust.address, cust.email, cust.password, cust.id, cust.currentservice], (err, updatedProfile) => {
            if(err){
                res.send(err)
            } else {
                res.send(updatedProfile)
            }
        })
    },
    planInfo: (req, res) => {
        db.planInfo( (err, planInfo) => {
            if(err){
                res.send(err)
            }else {
                res.send(planInfo)
            }
        })
    },
    addPlan: (req, res) => {

        db.addPlan( [ req.body.selectedPlanId, req.body.userId], (err, addPlan) => {
            if(err){
                res.send(err)
            } else {
                res.send(addPlan)
            }
        })
    },
    serviceStatus: (req, res) => {
        let cust = req.body;
        db.serviceStatus( [ cust.customerid, cust.customernote, cust.servicestatus] , (err, serviceStatus) => {
            if(err){
                res.send(err)
            } else {
                res.send(serviceStatus)
            }
        })
    },
    adminCustUpdate: (req, res) => {
        let cust = req.body;
        db.adminCustUpdate( [ cust.fname, cust.lname, cust.address, cust.email, cust.currentservice, cust.password, cust.assignedtech, cust.serviceday, cust.servicetime, cust.id], (err, adminCustUpdate) => {
            if(err){
                res.send(err)
            } else {
                res.status(200).send(adminCustUpdate)
            }
        })
    }
};