var express = require('express');
var request = require('request');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var db = require('./mongodb/config.js');
var Trend = require('./mongodb/models/trend.js');
var LocationTrend = require('./mongodb/models/locationTrend.js');

/*************************************************************
Local Dependencies
**************************************************************/
var countryTrends = require('./server/twitterAPI/countryTrends');
var cityTrends = require('./server/twitterAPI/cityTrends');
var usRoutes = require('./server/middleware/usRoutes');

/*************************************************************
Express Config
**************************************************************/
var app = express();
app.use(morgan('combined'));
//load client side assets
app.use(express.static(path.join(__dirname, 'public')));
//client side package manager
app.use('/bower_components', express.static(__dirname + '/bower_components'));
// Parse
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({
  extended: true
}));

/*************************************************************
ROUTES FOR /api/us/*
**************************************************************/
app.use('/api/us', usRoutes);

/*************************************************************
TEST ROUTES
**************************************************************/

app.get('/populateDatabaseWithCountryTrends', function(req, res) {
  countryTrends.returnTrendsByCountry(function(results) {
    console.log("results", results);
    res.status(200);
    res.send(results);
  });
});

app.get('/populateDatabaseWithCityTrends', function(req, res) {
  cityTrends.returnTrendsByCity(function(results) {
  console.log("results", results);
  res.status(200);
  res.send(results);
  });
});

app.get('/db', function(req, res) {
  Trend.find(function(err, trends) {
    if (err) {
      throw err;
    }
    console.log('TRENDS', trends);
    res.status(200);
    res.send(trends);
  });
});

app.get('/locationTrends', function(req, res) {
  LocationTrend.find(function(err, trends) {
    if (err) {
      throw err;
    }
    console.log('locationTrends', trends);
    res.status(200);
    res.send(trends);
  });
});


/*************************************************************
Port
**************************************************************/

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 5000);

app.listen(port);
console.log("Listening on: " + port);
