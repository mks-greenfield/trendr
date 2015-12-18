var _ = require('underscore');
var fs = require('fs');
var twitter = require('twitter');
// var config = require('./config');
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
**************************************************************/
var consumer_key = process.env.CONSUMER_KEY || config.keys.consumer_key;
var consumer_secret = process.env.CONSUMER_SECRET || config.keys.consumer_secret;
var access_token_key = process.env.ACCESS_TOKEN_KEY || config.keys.access_token_key;
var access_token_secret = process.env.ACCESS_TOKEN_SECRET || config.keys.access_token_secret;

var client = new twitter({
  consumer_key: config.keys.consumer_key,
  consumer_secret: config.keys.consumer_secret,
  access_token_key: config.keys.access_token_key,
  access_token_secret: config.keys.access_token_secret
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
    }

    countries = parseResponse(tweets);

    if (callback) {
      callback(countries);
    }
  });
}

/*************************************************************
Example of writing to a file
**************************************************************/

// fs.writeFile('./tweets.txt', tweets, function(err){
//   if(err){console.log(err)}
// })

/*************************************************************
Histogram Function
**************************************************************/

var histogram = function(ar){
  return reduce(ar, function(obj, key){
    obj[key] = obj[key] || 0;
    obj[key]++;
    return obj;
  }, {});
};

