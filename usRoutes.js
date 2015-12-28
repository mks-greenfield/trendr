var express = require('express');
var router = express.Router();
var db = require('./mongodb/config');
var USTrend = require('./mongodb/models/USTownTrend');
var async = require('async');
var _ = require('underscore');
var query = require('./queries');

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
GET /api/us/cities
GET /api/us/cities/<cityname>/today
GET /api/us/cities/<cityname>/weeklyvolume
GET /api/us/cities/<cityname>/weeklytrends
**************************************************************/

//Returns all cities that have trend data.
router.get('/cities', function(req, res) {

  query.distinctCities(function(err, result) {
    if (err) {
      console.log("error", err);
      res.status(500);
      res.send("Internal Server Error");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

router.get('/cities/:cityname/today', function(req, res) {
  var city = req.params.cityname;

  res.status(200);
  res.send('returns trends and tweet volume for that city for today ordered by tweet volume.');
});

router.get('/cities/:cityname/weeklyvolume', function(req, res) {
  var city = req.params.cityname;

  res.status(200);
  res.send('returns the 10 top trends and tweet volume for that city for the last 7 days ordered by tweet volume.');
});

router.get('/cities/:cityname/weeklytrends', function(req, res) {
  var city = req.params.cityname;

  res.status(200);
  res.send('returns the 10 top trends for that city for the last 7 days ordered by number of days trending.');
});

/*************************************************************
GET /api/us/states
GET /api/us/states/<statename>/today
GET /api/us/states/<statename>/weeklyvolume
GET /api/us/states/<statename>/weeklytrends
**************************************************************/

//Returns all states that have trend data.
router.get('/states', function(req, res) {

  query.distinctStates(function(err, result) {
    if (err) {
      console.log("error", err);
      res.status(500);
      res.send("Internal Server Error");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

router.get('/states/:statename/today', function(req, res) {
  var state = req.params.statename;

  res.status(200);
  res.send('returns trends and tweet volume for that state for today ordered by aggregate tweet volume.');
});

router.get('/states/:statename/weeklyvolume', function(req, res) {
  var state = req.params.statename;

  res.status(200);
  res.send('returns the 10 top trends and tweet volume for that state for the last 7 days ordered by aggregate tweet volume in its cities.');
});

router.get('/states/:statename/weeklytrends', function(req, res) {
  var state = req.params.statename;

  res.status(200);
  res.send('returns the 10 top trends for that state for the last 7 days ordered by the aggregate number of days trending in its cities.');
});

/*************************************************************
GET /api/us/trends
GET /api/us/trends/<trendname>/city
GET /api/us/trends/<trendname>/state
GET /api/us/trends/<trendname>/volume
**************************************************************/

//returns all distinct trends in the last day
router.get('/trends/day', function(req, res) {

  query.distinctTrendsToday(function(err, result) {
    if (err) {
      console.log("error", err);

      res.status(500);
      res.send("Internal Server Error. Cannot read from database at this time.")
    } else {

      res.status(200);
      res.send(result);
    }
  });
});

//Returns which cities had the trend in the last 7 days.
router.get('/trends/:trendname/city', function(req, res) {
  var trend = req.params.trendname;

  var startDate = new Date()  // Current date
  startDate.setDate(startDate.getDate()-7) // Subtract 7 days
  startDate.setHours(0)   // Set the hour, minute and second components to 0
  startDate.setMinutes(0)
  startDate.setSeconds(0)

  USTrend.distinct("location_name")
         .where({trend_name : trend, created_at: {$gt: startDate, $lt: new Date(),}})
         .exec(function(err, item) {
            if (err) {
              console.log("error", err);

              res.status(500);
              res.send("Internal Server Error. Cannot read from database at this time.")
            } else {
              console.log("item", item);
              res.status(200);
              res.send(item);
            }
         });
});

//Returns which states had the trend in the last 7 days.
router.get('/trends/:trendname/state', function(req, res) {
  var trend = req.params.trendname;

  var startDate = new Date()  // Current date
  startDate.setDate(startDate.getDate()-7) // Subtract 7 days
  startDate.setHours(0)   // Set the hour, minute and second components to 0
  startDate.setMinutes(0)
  startDate.setSeconds(0)

  USTrend.distinct("state")
         .where({trend_name : trend, created_at: {$gt: startDate, $lt: new Date(),}})
         .exec(function(err, item) {
            if (err) {
              console.log("error", err);

              res.status(500);
              res.send("Internal Server Error. Cannot read from database at this time.")
            } else {
              console.log("item", item);
              res.status(200);
              res.send(item);
            }
         });
});

router.get('/trends/:trendname/volume', function(req, res) {
  var trend = req.params.trendname;
  
  res.status(200);
  res.send("returns tweet volume of the trend across all cities in the last 7 days.");
});

/*************************************************************
GET /api/us/country/today
GET /api/us/country/weekly
**************************************************************/

//returns all trends today in the U.S. ordered by number of cities having that trend.
router.get('/country/today', function(req, res) {

  var startDate = new Date()  // Current date
  startDate.setHours(0)   // Set the hour, minute and second components to 0
  startDate.setMinutes(0)
  startDate.setSeconds(0)

  var trend_data = {};

  //find all trends created today
  USTrend.distinct("trend_name")
         .where({created_at: {$gt: startDate, $lt: new Date(),}})
         .exec(function(err, trends) {
            if (err) {
              console.log("error", err);

              res.status(500);
              res.send("Internal Server Error. Cannot read from database at this time.")
            } else {

              async.each(trends, function(trend, next) {

                //return count of which cities had that trend today
                USTrend.distinct("location_name")
                       .where({trend_name : trend, created_at: {$gt: startDate, $lt: new Date(),}})
                       .count()
                       .exec(function(err, count) {
                          if (err) {
                            console.log("error", err);

                          } else {
                            //console.log("count", count);
                            trend_data[trend] = count;
                            next();
                          }
                       });   
              }, function(error){
                  if(error) {
                    console.log('A town failed to process');
                  } else {
                    //console.log('All towns have been processed successfully');
                    
                    //sort by city count in descending order
                    var result =  _.sortKeysBy(trend_data, function (value, key) {
                      //changes from ascending to descending sort
                      return -(value);
                    });

                    res.status(200);
                    res.send(result);
                  }
              });
            }
         });
});

router.get('/country/weekly', function(req, res) {

  res.status(200);
  res.send("returns the top 10 trends in the last week in the U.S. by number of cities having that trend over 7 days.");
});

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res){

  res.status(404);
  res.send("Not a valid route.");
});

module.exports = router;