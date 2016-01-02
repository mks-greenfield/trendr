var _ = require('underscore');
var Twitter = require('twitter');
var utilities = require('../shared/shared');

/*************************************************************
Twitter Config
All of these process variables live in .env
**************************************************************/

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


/*************************************************************
GET trends/place
Endpoint returns the trending hashtags for a specified WOEID within a 24 hour time frame.

**************************************************************/

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

  paramArray = [{
        id: 2487956
      }, {
        id: 2487889
      }, {
        id: 2379574
      }, {
        id: 2450022
      }, {
        id: 2459115
      }, {
        id: 2514815
      }, {
        id: 2490383
      }, {
        id: 2436704
      }, {
        id: 2475687
      }, {
        id: 2391279
      }, {
        id: 2486340
      }, {
        id: 2442047
      }, {
        id: 2471390
      }
    ]


exports.returnTrendByCity = function(callback) {
  // this for loop was to populate db with all locations listed above, making an api call to each location id
  for (var i = 0; i < paramArray.length; i++) {
    var params = paramArray[i];

    client.get('trends/place', params, function(error, tweets, response) {
      if (error) {
        console.log('ERROR OCCURED', error);
        throw error;
      }

      for (var i = 0; i < tweets[0].trends.length; i++) {
        if (tweets[0].trends[i].tweet_volume) {
          new LocationTrend({
              location: tweets[0].locations[0].name,
              trend_name: tweets[0].trends[i].name,
              tweet_volume: tweets[0].trends[i].tweet_volume,
              created_at: tweets[0].created_at

          })
          .save(function(err) {
            if (err) {
              throw err;
            }
            console.log('trend saved to db!');
          });
        }
      }
      
      if (callback) {
        callback(tweets);
      }

    });

  } // end for loop bracket
};


