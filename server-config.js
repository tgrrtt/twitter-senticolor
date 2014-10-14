var express = require('express');
var bodyParser = require('body-parser');
var sentiment = require('sentiment');
var secrets = require('./secrets.js');

var Twit = require('twit');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
  
var T = new Twit({
  consumer_key: secrets.consumerKey,
  consumer_secret: secrets.consumerSecret,
  access_token: secrets.accessToken,
  access_token_secret: secrets.accessTokenSecret
});

// maybe app should just post to firebase?
app.post('/', function(req, res) {  
  // get the specified search term, and look up its history 
  var toSearchFor = req.body.search;
    
  T.get('search/tweets', { q: toSearchFor + ' lang=en ', count: 100 }, function(err, data, response) {
    // data.statuses contains all tweets
    // d.s[i].text will be the actual tweet
    var tweetMsg = '';
    for (var i = 0; i < data.statuses.length; i++) {
   
      tweetMsg += data.statuses[i].text;  
      
    }
    var sentiScore = sentiment(tweetMsg).score.toString();
    //console.log(typeof sentiScore, sentiScore);
    res.end(sentiScore);
  });
});

app.get('/');

app.use(express.static(__dirname + '/dist'));

// on firebase change, get latest change
// delete the old one
// run sentiment analysis on the new one
// upload the data for that back to firebase

module.exports = app;
