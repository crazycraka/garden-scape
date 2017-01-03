////////////////////////
// REQUIRED SOFTWARE//
////////////////////////

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var app = module.exports = express();
// var bootstrap = require('bootstrap');
// var ngmap = require('ngmap');
var middleware = require('middleware');
var port = 3000;
app.use(bodyParser.json());
app.use(cors());


// app.use(session({
//     secret: config.secret,
//     saveUninitialized: false,
//     resave: true
// }));
app.use(express.static( __dirname + '/public'));
app.use('/dist',express.static(__dirname + '/../dist'));
var massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/garden'});

app.set('db', massiveInstance);
var db = app.get('db');
////////////////////////
// REQUIRED CONTROLLERS//
////////////////////////
var mainServCtrl = require('./serverCtrl/mainServCtrl.js');

////////////////////////
// REQUESTS ENDPOINTS//
////////////////////////

app.get('/listall', mainServCtrl.listAll);
app.post('/login/newCust', mainServCtrl.newCust);
app.post('/login/returningCust', mainServCtrl.returningCust);
app.post('/editProfile', mainServCtrl.editProfile);
app.get('/planInfo', mainServCtrl.planInfo);
app.post('/addPlan', mainServCtrl.addPlan);





////////////////////////
// LISTEN//
////////////////////////

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
