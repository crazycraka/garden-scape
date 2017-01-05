////////////////////////
// REQUIRED SOFTWARE//
////////////////////////

let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let cors = require('cors');
let massive = require('massive');
let app = module.exports = express();
// var bootstrap = require('bootstrap');
// var ngmap = require('ngmap');
let middleware = require('middleware');
let port = 3000;
app.use(bodyParser.json());
app.use(cors());
let config = require('./config.js');


let herokuPostgresURI = process.env.DATABASE_URL || config.herokuPostgresURI;
let googleMapsKey =  process.env.GOOGLE_MAPS_KEY || config.secretGoogleKey;

// app.use(session({
//     secret: config.secret,
//     saveUninitialized: false,
//     resave: true
// }));
app.use(express.static( __dirname + '/public'));
app.use('/dist',express.static(__dirname + '/../dist'));

//when saving to heroku, make sure to change connectionString value to 'postgres://localhost/garden'
let massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/garden'});

app.set('db', massiveInstance);
let db = app.get('db');

////////////////////////
// REQUIRED CONTROLLERS//
////////////////////////
let mainServCtrl = require('./serverCtrl/mainServCtrl.js');

////////////////////////
// REQUESTS ENDPOINTS//
////////////////////////

app.get('/listall', mainServCtrl.listAll);
app.post('/login/newCust', mainServCtrl.newCust);
app.post('/login/returningCust', mainServCtrl.returningCust);
app.post('/editProfile', mainServCtrl.editProfile);
app.get('/planInfo', mainServCtrl.planInfo);
app.post('/addPlan', mainServCtrl.addPlan);
app.post('/serviceStatus', mainServCtrl.serviceStatus);
app.post('/adminCustUpdate', mainServCtrl.adminCustUpdate);




////////////////////////
// LISTEN//
////////////////////////

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
