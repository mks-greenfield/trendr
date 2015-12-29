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
var countryTrends = require('./utilities/twitterAPI/countryTrends');
var usRoutes = require('./utilities/middleware/usRoutes');

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

app.get('/api', function(req, res) {

  countryTrends.returnTrendsByCountry(function(results) {
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

// TESTING NEW API CALL

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.get('/test', function(req, res) {

  // specify id (WOEID) for each city then make a get request to the end point.
  // These are stored on my local DB atm (Simon).
  // Be careful not to call this same location twice or it will duplicate data in the DB.
  // Maybe need to figure out how to prevent this.

  // var params = {id: 2487956}; // San Francisco
  // var params = {id: 2487889}; // San Diego
  // var params = {id: 2379574}; // Chicago
  // var params = {id: 2450022}; // Miami
  // var params = {id: 2459115}; // New York (City)
  // var params = {id: 2514815}; // Washington (D.C.)
  // var params = {id: 2490383}; // Seattle
  // var params = {id: 2436704}; // Las Vegas
  // var params = {id: 2475687}; // Portland
  // var params = {id: 2391279}; // Denver
  // var params = {id: 2486340}; // Sacramento
  // var params = {id: 2442047}; // Los Angeles
  // var params = {id: 2471390}; // Phoenix
  // var params = {id: }; // 

  paramArray = [{
        id: 2487956
      },
      // {id: 2487889},
      // {id: 2379574},
      // {id: 2450022},
      {
        id: 2459115
      }, {
        id: 2514815
      }, {
        id: 2490383
      }, {
        id: 2436704
      },
      // {id: 2475687},
      {
        id: 2391279
      }, {
        id: 2486340
      }, {
        id: 2442047
      }, {
        id: 2471390
      }
    ]
    // this for loop was to populate db with all locations listed above, making an api call to each location id
  for (var i = 0; i < paramArray.length; i++) {
    var params = paramArray[i];

    client.get('trends/place', params, function(error, tweets, response) {
      if (error) {
        console.log('ERROR OCCURED', error);
        throw error;
      }

      var apiArr = tweets;

      for (var i = 0; i < apiArr[0].trends.length; i++) {
        if (apiArr[0].trends[i].tweet_volume) {
          new LocationTrend({
              location: apiArr[0].locations[0].name,
              trend_name: apiArr[0].trends[i].name,
              tweet_volume: apiArr[0].trends[i].tweet_volume
            })
            .save(function(err) {
              if (err) {
                throw err;
              }
              console.log('trend saved to db!');
            });
        }
      }
      // res.status(200); // need to comment these out if you want to loop through several api calls to populate db
      // res.send(tweets); // 

    });

  } // end for loop bracket
});




/*************************************************************
Port
**************************************************************/

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 5000);

app.listen(port);
console.log("Listening on: " + port);
