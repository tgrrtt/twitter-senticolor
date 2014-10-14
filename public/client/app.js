var app = angular.module("hashtagSentiment", []);

app.controller("hashtagSentimentController", ["$scope", "Sentiment",
  function($scope, Sentiment) {
    $scope.search;
    $scope.sentilyze = function(){
      console.log($scope.search);
    };
    console.log("yo");
    console.log(Sentiment);
  }
]);

app.factory("Sentiment", function(){
  // fetch function goes here
  return {stringCheez: "string"} 
});
