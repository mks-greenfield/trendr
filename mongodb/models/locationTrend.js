var db = require('../config');
var mongoose = require('mongoose');

/*************************************************************
Tentative Schema based on GET trends/places
**************************************************************/

var locationTrendSchema = new mongoose.Schema({
  location : {type: String}, // Ex: San Francisco
  trend_name : {type: String}, //Ex: #SandraBland
  tweet_volume : {type: Number}, // Ex: 22355
  created_at : {type: Date} // Ex: 2012-08-24T23:24:14Z
});

var LocationTrend = mongoose.model("LocationTrend", locationTrendSchema);

locationTrendSchema.pre("save", function(next, done) {
  //in case I need to do anything here
  next();
});

// testing entering into db

// apiArr is an example of what the data looks like from GET trends/place.  This is straight from the twitter API documentation

// var apiArr = [
//   {
//     "as_of": "2012-08-24T23:25:43Z",
//     "created_at": "2012-08-24T23:24:14Z",
//     "locations": [
//       {
//         "name": "Worldwide",
//         "woeid": 1
//       }
//     ],
//     "trends": [
//       {
//         "tweet_volume": 3200,
//         "events": null,
//         "name": "#GanaPuntosSi",
//         "promoted_content": null,
//         "query": "%23GanaPuntosSi",
//         "url": "http://twitter.com/search/?q=%23GanaPuntosSi"
//       },
//       {
//         "tweet_volume": 4200,
//         "events": null,
//         "name": "#WordsThatDescribeMe",
//         "promoted_content": null,
//         "query": "%23WordsThatDescribeMe",
//         "url": "http://twitter.com/search/?q=%23WordsThatDescribeMe"
//       },
//       {
//         "tweet_volume": 1200,
//         "events": null,
//         "name": "#10PersonasQueExtra\u00f1oMucho",
//         "promoted_content": null,
//         "query": "%2310PersonasQueExtra%C3%B1oMucho",
//         "url": "http://twitter.com/search/?q=%2310PersonasQueExtra%C3%B1oMucho"
//       },
//       {
//         "tweet_volume": 500,
//         "events": null,
//         "name": "Apple $1.5",
//         "promoted_content": null,
//         "query": "%22Apple%20$1.5%22",
//         "url": "http://twitter.com/search/?q=%22Apple%20$1.5%22"
//       },
//       {
//         "tweet_volume": 3100,
//         "events": null,
//         "name": "Zelko",
//         "promoted_content": null,
//         "query": "Zelko",
//         "url": "http://twitter.com/search/?q=Zelko"
//       },
//       {
//         "tweet_volume": 3200,
//         "events": null,
//         "name": "LWWY",
//         "promoted_content": null,
//         "query": "LWWY",
//         "url": "http://twitter.com/search/?q=LWWY"
//       },
//       {
//         "tweet_volume": 7700,
//         "events": null,
//         "name": "Lance Armstrong",
//         "promoted_content": null,
//         "query": "%22Lance%20Armstrong%22",
//         "url": "http://twitter.com/search/?q=%22Lance%20Armstrong%22"
//       },
//       {
//         "tweet_volume": 3700,
//         "events": null,
//         "name": "Gonzo",
//         "promoted_content": null,
//         "query": "Gonzo",
//         "url": "http://twitter.com/search/?q=Gonzo"
//       },
//       {
//         "tweet_volume": 3700,
//         "events": null,
//         "name": "Premium Rush",
//         "promoted_content": null,
//         "query": "%22Premium%20Rush%22",
//         "url": "http://twitter.com/search/?q=%22Premium%20Rush%22"
//       },
//       {
//         "tweet_volume": 2200,
//         "events": null,
//         "name": "Sweet Dreams",
//         "promoted_content": null,
//         "query": "%22Sweet%20Dreams%22",
//         "url": "http://twitter.com/search/?q=%22Sweet%20Dreams%22"
//       }
//     ]
//   }
// ];
 
// This loop parses the data and adds it into the database based on our schema.  This code is in cityTrends.js as the function addTrendsToDatabase.

// for (var i = 0; i < apiArr[0].trends.length; i++) {
//   new LocationTrend({
//     location: apiArr[0].locations[0].name,
//     trend_name: apiArr[0].trends[i].name,
//     tweet_volume: apiArr[0].trends[i].tweet_volume
//     created_at: apiArr[0].created_at
//   })
//   .save(function(err) {
//     if(err) throw err;
//     console.log('trend saved!');
//   })
// };

module.exports = LocationTrend;

