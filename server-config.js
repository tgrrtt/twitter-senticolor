var express = require('express');
var secrets = require('./secrets.js')
var Twit = require('twit');
var sentiment = require('sentiment');

var app = express();

var T = new Twit({
  consumer_key: secrets.consumerKey,
  consumer_secret: secrets.consumerSecret,
  access_token: secrets.accessToken,
  access_token_secret: secrets.accessTokenSecret
});

app.use(express.static(__dirname + '/dist'));

module.exports = app;
