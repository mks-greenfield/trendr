var _ = require('underscore');
var twitter = require('twitter');

/*************************************************************
Add Underscore Mixin to sort by keys
**************************************************************/

_.mixin({
  'sortKeysBy': function (obj, comparator) {
    var keys = _.sortBy(_.keys(obj), function (key) {
      return comparator ? comparator(obj[key], key) : key;
    });

    return _.object(keys, _.map(keys, function (key) {
      return obj[key];
    }));
  }
});

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

      return _.sortKeysBy(countries, function (value, key) {
        //changes from ascending to descending sort
        return -(value);
      });
    };

    countries = parseResponse(tweets);

    if (callback) {
      callback(countries);
    }
  });
};

