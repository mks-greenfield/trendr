var express = require('express');
var request = require('request');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var twitter = require('twitter');
var fs = require('fs');
var path = require('path');

var app = express();
app.use(morgan('combined'));
//load client side assets
app.use(express.static(path.join(__dirname, 'public')));
//client side package manager
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 3000);

app.listen(port);

console.log("Listening on: " + port);

/*
var client = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

app.get('/api', function(req, res){
  console.log('server got request');

  var data;
  var resp;
  var tweets;
  
  //make api call to twitter
  client.get('trends/available.json', function(error, tweets, resp){
    if(error) console.log(error);  

//  resp = JSON.stringify(resp)
    //histogram function
    // var histogram = function(ar){
    //   return reduce(ar, function(obj, key){
    //     obj[key] = obj[key] || 0;
    //     obj[key]++;
    //     return obj;
    //   }, {});
    // };

    //function parse and format twitter data
    var respParse = function(dataString){
      var data = dataString
      // console.log(data)
      var countries = []
      data.forEach(function(el,index,arr){
        if(el.country !== ''){
          countries.push(el.country)
        }
      })

      return countries
    }    

    //actually parse/format data
    tweets = respParse(tweets)
    console.log(tweets)

    // resp = resp

    // fs.writeFile('./response.txt', resp, function(err){
    //   if(err){console.log(err)}
    // })

    //write tweet data to text file
    fs.writeFile('./tweets.txt', tweets, function(err){
      if(err){console.log(err)}
    })

  });
      

    // read from tweet file 
    // fs.readFile('./tweets.txt', function (err, resp) {
    //   if (err) { console.log( err; ) }
    //   data = resp;
    //   console.log(data);
    // });

    
    res.status(201)
    // res.json()
    res.send(tweets)
    res.end()
})

*/