var app = angular.module("hashtagSentiment", []);

app.controller("hashtagSentimentController", ["$scope", "Sentiment",
  function($scope, Sentiment) {
    $scope.search = '';
    $scope.nowTracking = "#sentiment";
    $scope.sentilyze = function(){
      Sentiment.searchForThing('{"search": "' + $scope.search + '"}')
      .then(function(data) {
        console.log(data);
        $scope.nowTracking = $scope.search;
      })
    };
    
  
  }
]);

app.factory("Sentiment", ["$http", function($http){
  // fetch function goes here
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
  
  return {searchForThing: searchForThing}; 
}]);
