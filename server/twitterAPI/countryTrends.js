var _ = require('underscore');
var twitter = require('twitter');
var utilities = require('../shared/shared');

/*************************************************************
Twitter Config
All of these process variables live in .env
**************************************************************/

var client = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

/*************************************************************
GET trends/available
Endpoint returns locations that Twitter has trending topic information for.
getTrendsByCountry returns number of current available trends by country.
**************************************************************/

exports.returnTrendsByCountry = function(callback) {

  client.get('trends/available.json', function(error, tweets, resp){
    if(error) {
      console.log(error);  
    }

    //Iterates through Tweets and returns
    //an object that is the number of current
    //available trends by country
    var parseResponse = function(tweetData){
      var countries = {};

      tweetData.forEach(function(item){
        if(item.country !== ''){
          if (countries[item.country]) {
            ++countries[item.country];
          } else {
            countries[item.country] = 1;
          }
        }
      });

      return utilities.sortKeysBy(countries);
    };

    countries = parseResponse(tweets);

    if (callback) {
      callback(countries);
    }
  });
};

