var express = require('express');
var router = express.Router();

/*************************************************************
GET /api/us/cities
GET /api/us/cities/<cityname>/today
GET /api/us/cities/<cityname>/weeklyvolume
GET /api/us/cities/<cityname>/weeklytrends
**************************************************************/

router.get('/cities', function(req, res) {

  res.status(200);
  res.send('returns all cities that have trend data.');
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

router.get('/states', function(req, res) {

  res.status(200);
  res.send('returns all states that have trend data.');
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