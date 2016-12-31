// set up ======================================================================
// get all the tools we need
var express  = require('express');

var path = require('path');
var app      = express();
//app.use(express.static(__dirname+ '/public'));
app.use(express.static(path.join(__dirname, 'app/controllers')));
app.use(express.static(path.join(__dirname, 'app/services'))); //TODAY
app.use(express.static(path.join(__dirname, 'app'))); //TODAY
app.use(express.static(path.join(__dirname, 'public/views')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.set('views', path.join(__dirname, 'public/views'));

var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

	// set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({ extended: true })); //THIS IS TOTALLY CRUCIAL

    //app.set('view engine', 'ejs'); // set up ejs for templating

    // required for passport
    app.use(session({ secret: 'list-app-secret' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
