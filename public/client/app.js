var app = angular.module("hashtagSentiment", []);

app.controller("hashtagSentimentController", ["$scope", "Sentiment",
  function($scope, Sentiment) {
    $scope.search = '';
    $scope.nowTracking = "#sentiment";
    $scope.myStyle = '';
    $scope.backgroundColor;
    $scope.sentilyze = function(){
      // initiate sentiment lookup for the passed in string.
      Sentiment.searchForThing('{"search": "' + $scope.search + '"}')
      .then(function(data) { 
        // set the displayed hashtag thing to what the sentiment is being displayed for
        $scope.nowTracking = $scope.search;
        // find out the color that the background should be set to
        // uses comparative

        Sentiment.sentiToColor(data.comparative, function(color){

          $scope.backgroundColor = {'background-color': color,
          '-webkit-transition': 'background-color 1300ms linear',
          '-moz-transition': 'background-color 1300ms linear',
          '-o-transition': 'background-color 1300ms linear',
          '-ms-transition': 'background-color 1300ms linear',
          'transition': 'background-color 1300ms linear'}
          // console.log(color);
        })
      })
    }; 
  }
]);

app.factory("Sentiment", ["$http", function($http){
  // fetch function goes here
  var sentiToColor = function(comparativeNum, callback) {
    // is negative? set flag.
    // console.log(comparativeNum);
    var isNegative = false;
    var green = 0;
    var red = 0;
    var toRgb = 0;
    var alpha = 0;
    if (comparativeNum < 0) {
      isNegative = true; 
      comparativeNum = Math.abs(comparativeNum);
    } 
    if (!isNegative) {
      green = 255; 
    } else { 
      red = 255;
    }
    // create a new alpha level based on comparative num
    alpha = 0.07 + (1 * comparativeNum);
    if (alpha > 1) {
      alpha = 1;
    }

    callback('rgba('+red+ ','+green+',0,'+alpha+')');   
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
