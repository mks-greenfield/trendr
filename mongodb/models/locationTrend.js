var db = require('../config');
var mongoose = require('mongoose');

/*************************************************************
Tentative Schema based on GET trends/places
**************************************************************/

var locationTrendSchema = new mongoose.Schema({
  location : {type: String}, // Worldwide
  trend_name : {type: String}, //#SandraBland
  tweet_volume : {type: Number}, //22355
  created_at : {type: String} // type: Date?
});

var LocationTrend = mongoose.model("LocationTrend", locationTrendSchema);

locationTrendSchema.pre("save", function(next, done) {
  //in case I need to do anything here
  next();
});

// testing entering into db

// var apiObj = {"United States":64,"United Kingdom":27,"Mexico":24,"Japan":22,"India":22,"Russia":20,"Brazil":16,"Korea":15,"Germany":13,"Turkey":13,"Indonesia":12,"Philippines":12,"France":11,"Spain":11,"Venezuela":10,"Canada":9,"Italy":8,"Ukraine":8,"Australia":8,"Malaysia":8,"Poland":7,"Nigeria":7,"South Africa":7,"Saudi Arabia":7,"Vietnam":6,"Pakistan":6,"Argentina":5,"Colombia":5,"Netherlands":5,"Belarus":5,"Chile":4,"Ireland":4,"Switzerland":4,"Egypt":4,"United Arab Emirates":4,"Israel":4,"Ecuador":3,"Norway":3,"Sweden":3,"Greece":3,"Ghana":3,"Kenya":3,"Dominican Republic":2,"Guatemala":2,"Peru":2,"Austria":2,"Latvia":2,"Singapore":2,"Thailand":2,"Algeria":2,"Jordan":2,"Oman":2,"New Zealand":2,"Bahrain":1,"Belgium":1,"Denmark":1,"Kuwait":1,"Lebanon":1,"Panama":1,"Portugal":1,"Qatar":1,"Puerto Rico":1};

var apiArr = [
  {
    "as_of": "2012-08-24T23:25:43Z",
    "created_at": "2012-08-24T23:24:14Z",
    "locations": [
      {
        "name": "Worldwide",
        "woeid": 1
      }
    ],
    "trends": [
      {
        "tweet_volume": 3200,
        "events": null,
        "name": "#GanaPuntosSi",
        "promoted_content": null,
        "query": "%23GanaPuntosSi",
        "url": "http://twitter.com/search/?q=%23GanaPuntosSi"
      },
      {
        "tweet_volume": 4200,
        "events": null,
        "name": "#WordsThatDescribeMe",
        "promoted_content": null,
        "query": "%23WordsThatDescribeMe",
        "url": "http://twitter.com/search/?q=%23WordsThatDescribeMe"
      },
      {
        "tweet_volume": 1200,
        "events": null,
        "name": "#10PersonasQueExtra\u00f1oMucho",
        "promoted_content": null,
        "query": "%2310PersonasQueExtra%C3%B1oMucho",
        "url": "http://twitter.com/search/?q=%2310PersonasQueExtra%C3%B1oMucho"
      },
      {
        "tweet_volume": 500,
        "events": null,
        "name": "Apple $1.5",
        "promoted_content": null,
        "query": "%22Apple%20$1.5%22",
        "url": "http://twitter.com/search/?q=%22Apple%20$1.5%22"
      },
      {
        "tweet_volume": 3100,
        "events": null,
        "name": "Zelko",
        "promoted_content": null,
        "query": "Zelko",
        "url": "http://twitter.com/search/?q=Zelko"
      },
      {
        "tweet_volume": 3200,
        "events": null,
        "name": "LWWY",
        "promoted_content": null,
        "query": "LWWY",
        "url": "http://twitter.com/search/?q=LWWY"
      },
      {
        "tweet_volume": 7700,
        "events": null,
        "name": "Lance Armstrong",
        "promoted_content": null,
        "query": "%22Lance%20Armstrong%22",
        "url": "http://twitter.com/search/?q=%22Lance%20Armstrong%22"
      },
      {
        "tweet_volume": 3700,
        "events": null,
        "name": "Gonzo",
        "promoted_content": null,
        "query": "Gonzo",
        "url": "http://twitter.com/search/?q=Gonzo"
      },
      {
        "tweet_volume": 3700,
        "events": null,
        "name": "Premium Rush",
        "promoted_content": null,
        "query": "%22Premium%20Rush%22",
        "url": "http://twitter.com/search/?q=%22Premium%20Rush%22"
      },
      {
        "tweet_volume": 2200,
        "events": null,
        "name": "Sweet Dreams",
        "promoted_content": null,
        "query": "%22Sweet%20Dreams%22",
        "url": "http://twitter.com/search/?q=%22Sweet%20Dreams%22"
      }
    ]
  }
];

// for (var i = 0; i < apiArr[0].trends.length; i++) {
//   new LocationTrend({
//     location: apiArr[0].locations[0].name,
//     trend_name: apiArr[0].trends[i].name,
//     tweet_volume: apiArr[0].trends[i].tweet_volume
//   })
//   .save(function(err) {
//     if(err) throw err;
//     console.log('trend saved!');
//   })
// };

module.exports = LocationTrend;

