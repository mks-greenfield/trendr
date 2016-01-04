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
  // Be careful not to call this same location twice or it will duplicate data in the DB.
  // Maybe need to figure out how to prevent this.

var paramArray = [
  {id: 2487956}, // San Francisco
  {id: 2487889}, // San Diego
  {id: 2379574}, // Chicago
  {id: 2450022}, // Miami
  {id: 2459115}, // New York (City)
  {id: 2514815}, // Washington (D.C.)
  {id: 2490383}, // Seattle
  {id: 2436704}, // Las Vegas
  {id: 2475687}, // Portland
  {id: 2391279}, // Denver
  {id: 2486340}, // Sacramento
  {id: 2442047}, // Los Angeles
  {id: 2471390}  // Phoenix
];


exports.returnTrendByCity = function(callback) {
  // returnTrendByCity makes an API call to each location in the paramsArray and adds the resulting data to the database. 
  var errorHandler = function(err) {
    if (err) {
      console.log('error occured when trying to save to database');
      throw err;
    }
    console.log('trend saved to db!');
  };

  var addTrendsToDatabase = function(error, tweets, response) {
    if (error) {
      console.log('ERROR OCCURED', error);
      throw error;
    }

    // this for loop was to populate db with all locations listed above, making an api call to each location id
    for (var i = 0; i < tweets[0].trends.length; i++) {
      if (tweets[0].trends[i].tweet_volume) {
        new LocationTrend({
            location: tweets[0].locations[0].name,
            trend_name: tweets[0].trends[i].name,
            tweet_volume: tweets[0].trends[i].tweet_volume,
            created_at: tweets[0].created_at
          })
          .save(errorHandler);
      }
    }

    if (callback) {
      callback(tweets);
    }
  };

  for (var i = 0; i < paramArray.length; i++) {
    var params = paramArray[i];
    client.get('trends/place', params, addTrendsToDatabase);
  }
};
