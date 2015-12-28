require('dotenv').load();

var db = require('./mongodb/config');
var USTrend = require('./mongodb/models/USTownTrend');
var async = require('async');
var utilities = require('./utilities/shared/shared');

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
Citywide
**************************************************************/

//Returns all cities that have trend data.
exports.distinctCities = function(cb) {
  USTrend.distinct("location_name")
         .exec(cb);
}

/*************************************************************
Statewide
**************************************************************/

//Returns all states that have trend data.
exports.distinctStates = function(cb) {
  USTrend.distinct("state")
         .exec(cb);
}

/*************************************************************
By Trend
**************************************************************/

//returns all distinct trends in the last day
exports.distinctTrendsToday = function(cb) {
  USTrend.distinct("trend_name")
         .where({created_at: {$gt: startOfYesterday, $lt: yesterday}})
         .exec(cb);
}

//Returns which states had the trend in the last 7 days.
exports.statesTrendingThisWeek = function(trendName, cb) {
  USTrend.distinct("state")
         .where({trend_name : trendName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
         .exec(cb);
}

//Returns a count of cities having a trend yesterday.
exports.cityCountTrendingYesterday = function(trendName, cb) {
  USTrend.distinct("location_name")
         .count()
         .where({trend_name : trendName, 
                 created_at: {$gt: startOfYesterday, $lt: yesterday}})
         .exec(cb);
}

//Returns a list of cities having a trend this past week.
exports.citiesTrendingThisWeek = function(trendName, cb) {
  USTrend.distinct("location_name")
         .where({trend_name : trendName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
         .exec(cb);
}

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
        exports.cityCountTrendingYesterday(trend, function(err, count) {
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
}
