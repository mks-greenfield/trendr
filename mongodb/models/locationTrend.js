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

module.exports = LocationTrend;

