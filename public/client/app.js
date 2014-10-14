var app = angular.module("hashtagSentiment", []);

app.controller("hashtagSentimentController", ["$scope", "Sentiment",
  function($scope, Sentiment) {
    $scope.search = '';
    $scope.nowTracking = "#sentiment";
    $scope.backgroundColor = '';
    $scope.sentilyze = function(){
      Sentiment.searchForThing('{"search": "' + $scope.search + '"}')
      .then(function(data) {
        console.log(data);
        $scope.nowTracking = $scope.search;
        Sentiment.sentiToColor(data.score, function(color){ 
          $scope.backgroundColor = color;
          console.log(color);
        })
      })
    }; 
  }
]);

app.factory("Sentiment", ["$http", function($http){
  // fetch function goes here
  var sentiToColor = function(sentimentNumber, callback) {
    // is negative? set flag.
    console.log(sentimentNumber);
    var isNegative = false;
    var green = 128;
    var red = 128;
    var toRgb = 0;
    if (sentimentNumber < 0) {
      isNegative = true; 
      sentimentNumber = Math.abs(sentimentNumber);
    }
    // absolute value, then multiply times 1.27
    toRgb = 1.27 * sentimentNumber;
    if (!isNegative) {
      green += toRgb;
      red -= toRgb;
    } else {
      green -= toRgb;
      red += toRgb;
    }
    callback('rgb('+red+ ','+green+',0)');
    // if positive, add to green val, subtract from red val
    // if neg, do reverse.  add those to rgb string, return that
    
    // return color
  }
  var searchForThing = function(searchItem){
    return $http({
      method: 'POST',
      url: '/',
      data: searchItem 
    })
    .then(function (resp) {  
      return resp.data;
    });
  };
  
  return {
    searchForThing: searchForThing,
    sentiToColor: sentiToColor
  }; 
}]);
