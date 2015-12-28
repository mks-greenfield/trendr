require('dotenv').load();

var db = require('./mongodb/config');
var USTrend = require('./mongodb/models/USTownTrend');
var async = require('async');
var _ = require('underscore');

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
Global Time Vars
**************************************************************/

var today = new Date();

var startofToday = new Date();
startofToday.setHours(0);
startofToday.setMinutes(0);
startofToday.setSeconds(0);

var sevenDaysAgo = new Date() 
sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7) 
sevenDaysAgo.setHours(0)
sevenDaysAgo.setMinutes(0)
sevenDaysAgo.setSeconds(0)

var yesterday = new Date();
yesterday.setDate(yesterday.getDate()-2);

var startOfYesterday = new Date();
startOfYesterday.setDate(startOfYesterday.getDate()-2);
startOfYesterday.setHours(0)
startOfYesterday.setMinutes(0)
startOfYesterday.setSeconds(0)

/*************************************************************
Mongoose Queries
**************************************************************/

exports.distinctCities = function(cb) {
  USTrend.distinct("location_name")
         .exec(cb);
}

exports.distinctStates = function(cb) {
  USTrend.distinct("state")
         .exec(cb);
}

exports.distinctTrendsToday = function(cb) {
  USTrend.distinct("trend_name")
         .where({created_at: {$gt: startOfYesterday, $lt: yesterday}})
         .exec(cb);
}

exports.cityCountTrendingYesterday = function(trendName, cb) {
  USTrend.distinct("location_name")
         .count()
         .where({trend_name : trendName, 
                 created_at: {$gt: startOfYesterday, $lt: yesterday}})
         .exec(cb);
}

exports.citiesTrendingThisWeek = function(trendName, cb) {
  USTrend.distinct("location_name")
         .where({trend_name : trendName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
         .exec(cb);
}

exports.statesTrendingThisWeek = function(trendName, cb) {
  USTrend.distinct("state")
         .where({trend_name : trendName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
         .exec(cb);
}


exports.usTrendsToday = function(cb) {
  var trend_data = {};

  //find all trends created today
  exports.distinctTrendsToday(function(err, trends) {
    if (err) {
      console.log("error", err); 

    } else {
       // console.log("trends", trends);

      async.each(trends, function(trend, next) {

        //return count of which cities have that trend
        exports.cityCountTrendingYesterday(trend, function(err, count) {
          if (err) {
            console.log("error", err); 

          } else {
            // console.log("count", count);

            trend_data[trend] = count;
            next();
          }
        });

      }, function(err) {
        if (err) {
          console.log("A city failed to process.");

        } else {

          //sort by city count in descending order
          var result =  _.sortKeysBy(trend_data, function (value, key) {
            //changes from ascending to descending sort
            return -(value);
          });

          cb(result);

          // console.log("result", result);    
        }
      });
    }
  });
}

// exports.usTrendsToday();











