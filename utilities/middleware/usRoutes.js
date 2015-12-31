var express = require('express');
var router = express.Router();
var query = require('../queries/usTrendQueries');
var _ = require('underscore');

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

//TODO
router.get('/cities/:cityname/today', function(req, res) {
  var city = req.params.cityname;

  res.status(200);
  res.send('returns trends and tweet volume for that city for today ordered by tweet volume.');
});

//Returns the distinct trends and tweet volume for that city for the last 7 days ordered by tweet volume.
router.get('/cities/:cityname/weeklyvolume', function(req, res) {
  var cityName = req.params.cityname;

  query.weeklyTweetVolumeRankByCity(cityName,function(result) {
    if (_.isEmpty(result)) {
      res.status(404);
      res.send("Currently no top trends for this city. Did you capitalize the city name?");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

//TODO
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

//TODO
router.get('/states/:statename/today', function(req, res) {
  var state = req.params.statename;

  res.status(200);
  res.send('returns trends and tweet volume for that state for today ordered by aggregate tweet volume.');
});

//Returns the top distinct trends and tweet volume for that state for the last 7 days 
//ordered by aggregate tweet volume in its cities.
router.get('/states/:statename/weeklyvolume', function(req, res) {
  var stateName = req.params.statename;

  query.weeklyTweetVolumeRankByState(stateName,function(result) {
    if (_.isEmpty(result)) {
      res.status(404);
      res.send("Currently no top trends for this state. Did you capitalize the state name?");
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

//TODO
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

//TODO
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

//TODO
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