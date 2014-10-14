var express = require('express');
if (!process.env.CONSUMER_KEY) {
  var secrets = require('./secrets.js')  
} else {
  secrets = {//object of env vars
  }
}
var Twit = require('twit');
var sentiment = require('sentiment');

var app = express();
// need to set this stuff as env vars on server
var T = new Twit({
  consumer_key: secrets.consumerKey,
  consumer_secret: secrets.consumerSecret,
  access_token: secrets.accessToken,
  access_token_secret: secrets.accessTokenSecret
});

// var stream = T.stream('statuses/filter', { track: 'mango', language: 'en' })
// 
// stream.on('tweet', function (tweet) {
//   console.log(tweet.text)
//   console.log(sentiment(tweet.text));
// })

T.get('search/tweets', { q: 'radiohead lang=en ', count: 100 }, function(err, data, response) {
  // data.statuses contains all tweets
  // d.s[i].text will be the actual tweet
  var tweetMsg = '';
  for (var i = 0; i < data.statuses.length; i++) {
 
    tweetMsg += data.statuses[i].text;  
    
  }
   console.log(sentiment(tweetMsg).score);
});

app.get('/')
app.use(express.static(__dirname + '/dist'));

// on firebase change, get latest change
// delete the old one
// run sentiment analysis on the new one
// upload the data for that back to firebase

module.exports = app;
