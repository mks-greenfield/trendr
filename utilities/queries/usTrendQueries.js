require('dotenv').load();

var db = require('../../mongodb/config');
var USTrend = require('../../mongodb/models/USTownTrend');
var utilities = require('../shared/shared');
var _ = require('underscore');
var async = require('async');

/*************************************************************
Global Time Vars
**************************************************************/

var today = new Date();

var startofToday = new Date();
startofToday.setHours(0);
startofToday.setMinutes(0);
startofToday.setSeconds(0);

var oneDayAgo = new Date();
oneDayAgo.setDate(oneDayAgo.getDate()-1); 

var oneDayAgoStart = new Date();
oneDayAgoStart.setDate(oneDayAgoStart.getDate()-1); 
oneDayAgoStart.setHours(0);
oneDayAgoStart.setMinutes(0);
oneDayAgoStart.setSeconds(0);

var sevenDaysAgo = new Date(); 
sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7); 
sevenDaysAgo.setHours(0);
sevenDaysAgo.setMinutes(0);
sevenDaysAgo.setSeconds(0);
/*************************************************************
Citywide
**************************************************************/

//WORK IN PROGRESS-- NEED A FEW MORE QUERIES FOR MY FEATURE- Polina
// for (var i = 0; i < 4; i++) {
//   var day = new Date();
//   day.setDate(day.getDate()-i); 

//   var startOfDay = new Date();
//   startOfDay.setDate(startOfDay.getDate()-i); 
//   startOfDay.setHours(0);
//   startOfDay.setMinutes(0);
//   startOfDay.setSeconds(0);

//   console.log(day, startOfDay);

//   USTrend.find({location_name: "Austin", trend_name: "God Is Gangsta"})
//          .where({created_at: {$gt: startOfDay, $lt: day}})
//          .select('trend_name tweet_volume created_at')
//          //.limit(2) //there seems to be only 1 thing so far for each trend, wierd
//          .exec(function(err, result) {
//           console.log("result", result);
//          });
  
// }

  // USTrend.find({location_name: "Austin", trend_name: "Happy New Year"})
  //      .where({created_at: {$gt: oneDayAgoStart, $lt: oneDayAgo}})
  //      .select('trend_name tweet_volume created_at')
  //      //.limit(2) //there seems to be only 1 thing so far for each trend, wierd
  //      .exec(function(err, result) {
  //       console.log("result", result);
  //      });

// USTrend.find({location_name: "Long Beach"})
//        .limit(1)
//        .select("state")
//        .exec(function(err, result) {
//         if (err) {
//           console.log("error", err);
//         } else {
//           console.log("result", result);
//         }
//        });

//Returns all cities that have trend data.
exports.distinctCities = function(cb) {
  USTrend.distinct("location_name")
         .exec(cb);
};

/*************************************************************
Daily Citywide
**************************************************************/

//Return all distinct trends for a city in the last 7 days
exports.dailyTrendsByCity = function(cityName, cb) {
  USTrend.distinct("trend_name")
         .where({location_name: cityName, 
                 created_at: {$gt: startofToday, $lt: today}})
         .exec(cb);
};

//Returns tweet volume for a trend in a city over the last 7 days
exports.dailyTweetVolumeByCityTrend = function(trendName, cityName, cb) {
  USTrend.find({location_name: cityName, trend_name: trendName})
         .where({created_at: {$gt: startofToday, $lt: today}})
         .select('trend_name tweet_volume created_at')
         //.limit(2) //there seems to be only 1 thing so far for each trend, wierd
         .exec(cb);
};

//Returns the distinct trends and tweet volume for that city for 
//the last 7 days ordered by tweet volume.
exports.dailyTweetVolumeRankByCity = function(cityName, cb) {
  var city_trend_count = {};

  exports.dailyTrendsByCity(cityName, function(err, trends) {

    if (err) {
      console.log("error", err);
    } else {

      async.each(trends, function(trend, next) {

        exports.dailyTweetVolumeByCityTrend(trend, cityName, function(err, result) {
          if (err) {
            console.log("error", err);
          } else {

            //ASSUMPTION: WE ONLY PULL TRENDS ONCE A DAY
            //THEREFORE, THERE SHOULDN'T BE DOUBLED TREND VOLUME
            //FOR A DAY

            //aggregate the trend volume over last 7 days
            //if trend volume is null, count is set to 0
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

//Return all distinct trends for a state in the last 7 days
exports.weeklyTrendsByState = function(stateName, cb) {
  USTrend.distinct("trend_name")
         .where({state: stateName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
         .exec(cb);
};

//Returns tweet volume for a trend in a state over the last 7 days
exports.weeklyTweetVolumeByStateTrend = function(trendName, stateName, cb) {
  USTrend.find({state: stateName, trend_name: trendName})
         .where({created_at: {$gt: sevenDaysAgo, $lt: today}})
         .select('location_name trend_name tweet_volume created_at')
         //.limit(2) //there seems to be only 1 thing so far for each trend, wierd
         .exec(cb);
};

//Returns the distinct trends and tweet volume for that state for 
//the last 7 days ordered by aggregate tweet volume across its
//cities
exports.weeklyTweetVolumeRankByState = function(stateName, cb) {
  var state_trend_count = {};

  exports.weeklyTrendsByState(stateName, function(err, trends) {

    if (err) {
      console.log("error", err);
    } else {

      async.each(trends, function(trend, next) {

        exports.weeklyTweetVolumeByStateTrend(trend, stateName, function(err, result) {
          if (err) {
            console.log("error", err);
          } else {

            //ASSUMPTION: WE ONLY PULL TRENDS ONCE A DAY
            //THEREFORE, THERE SHOULDN'T BE DOUBLED TREND VOLUME
            //FOR A DAY

            //aggregate the trend volume over last 7 days
            //if trend volume is null, count is set to 0
            var count =  _.reduce(result, function(memo, item) {
                            var num = item.tweet_volume || 0;
                            return memo + num; 
                          }, 0);

            //console.log("count", count);

            state_trend_count[trend] = count;
            next();
          }
        });

      }, function(err) {
        if (err) {
          console.log("A trend failed to process.");

        } else {
          //sort by keys (tweet volume) in descending order
          var result = utilities.sortKeysBy(state_trend_count);
          cb(result);   
        }
      });
    }
  });
};
/*************************************************************
By Trend
**************************************************************/

//returns all distinct trends in the last day
exports.distinctTrendsToday = function(cb) {
  USTrend.distinct("trend_name")
         .where({created_at: {$gt: startofToday, $lt: today}})
         .exec(cb);
};

//Returns which states had the trend in the last 7 days.
exports.statesTrendingThisWeek = function(trendName, cb) {
  USTrend.distinct("state")
         .where({trend_name : trendName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
         .exec(cb);
};

//Returns a count of cities having a trend yesterday.
exports.cityCountTrendingToday = function(trendName, cb) {
  USTrend.distinct("location_name")
         .count()
         .where({trend_name : trendName,
                 created_at: {$gt: startofToday, $lt: today}})
         .exec(cb);
};

//Returns a list of cities having a trend this past week.
exports.citiesTrendingThisWeek = function(trendName, cb) {
  USTrend.distinct("location_name")
         .where({trend_name : trendName, 
                 created_at: {$gt: sevenDaysAgo, $lt: today}})
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
