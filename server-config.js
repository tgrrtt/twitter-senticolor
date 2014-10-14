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
    
  T.get('search/tweets', { q: toSearchFor, count: 100}, function(err, data, response) {
    // console.log(toSearchFor);
    // data.statuses contains all tweets
    if (err) {
      console.log(err);
    }
    // d.s[i].text will be the actual tweet
    // console.log(data.statuses);
    var tweetMsg = '';
    for (var i = 0; i < data.statuses.length; i++) {
      // console.log(data.statuses[i]);
      tweetMsg += data.statuses[i].text; 
    }
    // console.log(tweetMsg);
    var sentiScore = JSON.stringify(sentiment(tweetMsg));
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
