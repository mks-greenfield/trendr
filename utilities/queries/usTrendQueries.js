var db = require('../../mongodb/config');
var USTrend = require('../../mongodb/models/usTownTrend');
var utilities = require('../shared/shared');
var _ = require('underscore');
var async = require('async');
var moment = require("moment");

/*************************************************************
Global Time Vars
**************************************************************/

var today = moment().format();
var twentyFourHoursAgo = moment().subtract('1','days').format();
var threeHoursAgo = moment().subtract('3','hours').format();

/*************************************************************
Citywide
**************************************************************/

//Returns all cities that have trend data.
exports.distinctCities = function(cb) {
  USTrend.distinct("location_name")
         .exec(cb);
};

//Return all distinct trends for a city in the last 3 hours
exports.currentTrendsByCity = function(cityName, cb) {
  USTrend.distinct("trend_name")
         .where({location_name: cityName, 
                 created_at: {$gt: threeHoursAgo, $lt: today}})
         .exec(cb);
};

//Returns all tweet volume for a trend in a city over the last 3 hours
exports.currentTweetVolumeByCityTrend = function(trendName, cityName, cb) {
  USTrend.find({location_name: cityName, trend_name: trendName})
         .where({created_at: {$gt: threeHoursAgo, $lt: today}})
         .select('trend_name tweet_volume created_at')
         .exec(cb);
};

//Returns all tweet volume for a trend in a city over the last 24 hours
exports.dailyTweetVolumeByCityTrend = function(trendName, cityName, cb) {
  USTrend.find({location_name: cityName, trend_name: trendName})
         .where({created_at: {$gt: twentyFourHoursAgo, $lt: today}})
         .select('trend_name tweet_volume created_at')
         .exec(cb);
};

//Returns the distinct trends and tweet volume for that city for
//the last three hours ordered by tweet volume
exports.currentTweetVolumeRankByCity = function(cityName, cb) {
  var city_trend_count = {};

  exports.currentTrendsByCity(cityName, function(err, trends) {

    if (err) {
      console.log("error", err);
    } else {

      async.each(trends, function(trend, next) {

        exports.currentTweetVolumeByCityTrend(trend, cityName, function(err, result) {
          if (err) {
            console.log("error", err);
          } else {

            var count =  _.reduce(result, function(memo, item) {
                            var num = item.tweet_volume || 0;
                            return memo + num; 
                          }, 0);

            city_trend_count[trend] = count;
            next();
          }
        });

      }, function(err) {
        if (err) {
          console.log("A trend failed to process.");

        } else {
          //sort by keys (tweet volume) in descending order
          var result = utilities.sortKeysBy(city_trend_count);
          cb(result);   
        }
      });
    }
  });
};

/*************************************************************
Statewide
**************************************************************/

//Returns all states that have trend data.
exports.distinctStates = function(cb) {
  USTrend.distinct("state")
         .exec(cb);
};

/*************************************************************
By Trend
**************************************************************/

//returns all distinct trends in the last day
exports.distinctTrendsToday = function(cb) {
  USTrend.distinct("trend_name")
         .where({created_at: {$gt: twentyFourHoursAgo, $lt: today}})
         .exec(cb);
};

//Returns a count of cities having a trend today.
exports.cityCountTrendingToday = function(trendName, cb) {
  USTrend.distinct("location_name")
         .count()
         .where({trend_name : trendName,
                 created_at: {$gt: twentyFourHoursAgo, $lt: today}})
         .exec(cb);
};

/*************************************************************
Countrywide
**************************************************************/

//returns all trends today in the U.S. ordered by number of cities having that trend.
exports.usTrendsToday = function(cb) {
  var trend_data = {};

  //find all trends created today
  exports.distinctTrendsToday(function(err, trends) {
    if (err) {
      console.log("error", err); 

    } else {

      async.each(trends, function(trend, next) {

        //return count of which cities have that trend
        exports.cityCountTrendingToday(trend, function(err, count) {
          if (err) {
            console.log("error", err); 

          } else {
            trend_data[trend] = count;
            next();
          }
        });

      }, function(err) {
        if (err) {
          console.log("A city failed to process.");

        } else {

          //sort by keys (city count) in descending order
          var result = utilities.sortKeysBy(trend_data);

          cb(result);   
        }
      });
    }
  });
};
