var express = require('express');
var request = require('request');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var Trend = require('./mongodb/models/trend.js');
var LocationTrend = require('./mongodb/models/locationTrend.js');

/*************************************************************
Local Dependencies
**************************************************************/
var countryTrends = require('./utilities/countryTrends');

/*************************************************************
Express Config
**************************************************************/
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

/*************************************************************
Routes
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





// TESTING NEW API CALL

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.get('/test', function(req, res) {
  console.log('testing');
  var params = {id: 2487956}; // San Francisco
  // var params = {lat: 37.7833, long: 122.4167}
  client.get('trends/place', params, function(error, tweets, response){
    if (error) {
      console.log('ERROR OCCURED', error);
      throw error;
    }
    
    var apiArr = tweets;

    for (var i = 0; i < apiArr[0].trends.length; i++) {
      new LocationTrend({
        location: apiArr[0].locations[0].name,
        trend_name: apiArr[0].trends[i].name,
        tweet_volume: apiArr[0].trends[i].tweet_volume
      })
      .save(function(err) {
        if(err) throw err;
        console.log('trend saved!');
      })
    };

    res.status(200);
    res.send(tweets);

  });
});




/*************************************************************
Port
**************************************************************/

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 5000);

app.listen(port);
console.log("Listening on: " + port);