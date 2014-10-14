var express = require('express');
var bodyParser = require('body-parser');
var sentiment = require('sentiment');

if (process.env.NODE_ENV !== 'production') {
  var secrets = require('./secrets.js'); 
}

var Twit = require('twit');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var T = new Twit({
  consumer_key: process.env.C_KEY || secrets.consumerKey,
  consumer_secret: process.env.C_SECRET || secrets.consumerSecret,
  access_token: process.env.A_TOKEN || secrets.accessToken,
  access_token_secret: process.env.A_TOKEN_SECRET || secrets.accessTokenSecret
});


app.post('/', function(req, res) {  
  // get the specified search term, and look up its history 
  var toSearchFor = req.body.search;
    
  T.get('search/tweets', { q: toSearchFor, count: 100}, function(err, data, response) {

    // data.statuses contains all tweets
    if (err) {
      console.log(err);
    }
    // d.s[i].text will be the actual tweet

    var tweetMsg = '';
    for (var i = 0; i < data.statuses.length; i++) {

      tweetMsg += data.statuses[i].text; 
    }

    var sentiScore = JSON.stringify(sentiment(tweetMsg));

    res.end(sentiScore);
  });
});

app.get('/');

app.use(express.static(__dirname + '/dist'));

module.exports = app;
