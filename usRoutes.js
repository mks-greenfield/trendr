var express = require('express');
var router = express.Router();
var url = require('url');

/*************************************************************
GET /api/us/cities
GET /api/us/cities?name=<cityname>&q=today
GET /api/us/cities?name=<cityname>&q=weeklyvolume
GET /api/us/cities?name=<cityname>&q=weeklytrends
**************************************************************/

router.get('/cities', function(req, res) {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  console.log("QUERY", query);
  res.send('testing this route');
});

/*************************************************************
GET /api/us/states
GET /api/us/states?name=<statename>&q=today
GET /api/us/states?name=<statename>&q=weeklyvolume
GET /api/us/states?name=<statename>&q=weeklytrends
**************************************************************/

router.get('/states', function(req, res) {
  res.send('testing this route');
});

/*************************************************************
GET /api/us/trends
GET /api/us/trends?name=<trendname>&q=city
GET /api/us/trends?name=<trendname>&q=state
GET /api/us/trends?name=<trendname>&q=volume
**************************************************************/

router.get('/trends', function(req, res) {
  res.send('testing this route');
});

/*************************************************************
GET /api/us/country/today
GET /api/us/country/weekly
**************************************************************/

router.get('/country/today', function(req, res) {

  res.status(200);
  res.send("returns top 10 trends today in the U.S. by number of cities having that trend.");
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