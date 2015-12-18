var express = require('express');
var request = require('request');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var utilities = require('./utilities');

var app = express();
app.use(morgan('combined'));
//load client side assets
app.use(express.static(path.join(__dirname, 'public')));
//client side package manager
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
// Parse
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 5000);

app.get('/api', function(req, res) {

  utilities.returnTrendsByCountry(function(results) {
    console.log("results", results);
    res.status(201);
    res.send(results);
  });
});

app.listen(port);
console.log("Listening on: " + port);