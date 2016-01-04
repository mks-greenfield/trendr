var express = require('express');
var router = express.Router();
var query = require('../queries/usTrendQueries');
var _ = require('underscore');
var interpolateLineRange = require('line-interpolate-points');
var stateUtils = require('../shared/stateAbbreviations');

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

//Returns the distinct trends and tweet volume for that city in the last 24 hours ordered by tweet volume.
router.get('/cities/:cityname/dailyvolume', function(req, res) {
  var cityName = req.params.cityname;

  query.currentTweetVolumeRankByCity(cityName,function(result) {
    if (_.isEmpty(result)) {
      res.status(404);
      res.send("Currently no top trends for this city. Did you capitalize the city name?");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

//Returns all tweet volume for a trend in a city over the last 24 hours
router.get('/cities/:cityname/:trendname', function(req, res) {
  var cityName = req.params.cityname;
  var trendName = req.params.trendname;

  query.dailyTweetVolumeByCityTrend(trendName, cityName,function(err, result) {
    if (_.isEmpty(result)) {
      res.status(404);
      res.send("Currently no top trends for this city. Did you capitalize the city name?");
    } else {
      res.status(200);
      // console.log("HEY", result);

      var lineRange = [];

      for (var i = 0; i < result.length; i++) {
        lineRange.push([1,result[i].tweet_volume]);
      }

      //HANDLE CASE WHERE ONLY 1 DATA POINT GETS BACK
      if (lineRange.length === 1) {
        lineRange.unshift([1,0]);
      }

      var data = interpolateLineRange(lineRange, 24);

      for (var i = 0; i < data.length; i++) {
        data[i][0] = i+1;
      }
      
      var obj = { key : trendName , values: data};

      res.send(obj);
    }
  });

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
      var data = [];
      for (var i = 0; i < result.length; i++) {
        var obj = {};
        obj.name = result[i];
        obj.id = stateUtils.abbreviateState(result[i]);
        data.push(obj);
      }
      res.status(200);
      res.send(data);
    }
  });
});

//Returns the distinct trends and tweet volume for that city in the last 24 hours ordered by tweet volume.
router.get('/states/:statename/dailyvolume', function(req, res) {
  var stateName = req.params.statename;

  query.currentTweetVolumeRankByState(stateName,function(result) {
    if (_.isEmpty(result)) {
      res.status(200);
      res.send(['Empty']);
    } else {
      res.status(200);
      res.send(result);
    }
  });
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
  var trendName = req.params.trendname;

  query.citiesTrendingThisWeek(trendName, function(err, result) {
    if (err) {
      console.log("error", err);

      res.status(500);
      res.send("Internal Server Error.");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

//Returns which states had the trend in the last 7 days.
router.get('/trends/:trendname/state', function(req, res) {
  var trendName = req.params.trendname;
  
  query.statesTrendingThisWeek(trendName, function(err, result) {
    if (err) {
      console.log("error", err);

      res.status(500);
      res.send("Internal Server Error.");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

/*************************************************************
GET /api/us/country/today
GET /api/us/country/weekly
**************************************************************/

//returns all trends today in the U.S. ordered by number of cities having that trend.
router.get('/country/today', function(req, res) {

  query.usTrendsToday(function(result) {
    if (_.isEmpty(result)) {
      res.status(404);
      res.send("Currently no top trends for today. Check again later.");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res){

  res.status(404);
  res.send("Not a valid route.");
});

module.exports = router;