var _ = require('underscore');
var fs = require('fs');
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
**************************************************************/

var client = new twitter({
  consumer_key: 'XTNRAKqNkOUDIVkGjl77PDopz',
  consumer_secret: 'Wl69RdzKPTz0XqRcH8c5Qjr8278DMBEubRLdngHkr5Jjrt6ANr',
  access_token_key: '43156220-mPD0tx2xzI0buaRU3thZ4eDiOjfp7FsIrUNg0mHdl',
  access_token_secret: 'FEvVa3flPoZAV9UraDDDLyaMqgj3sSkckIMAoJoXdy2Al'
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

