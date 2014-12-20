'use strict';

var wordNMeaningApp = angular.module('wordNMeaningApp', []);

wordNMeaningApp.controller('wordDefinitionController', ['$scope', '$http', function (scope, http) {

  scope.definitionSearch = function () {
    http({url: 'http://api.wordnik.com/v4/word.json/speech/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=724583fdf72680c36d0010ad78b03b1c4f3ea7b27c651f094', method: 'GET'}).

    success(function (response) {
      scope.wordResponse = response;
      console.log(scope.wordResponse);
    });
  };    
}]);


wordNMeaningApp.controller('wordThesaurusController', ['$scope', '$http', function (scope, http) {

  scope.thesaurusSearch = function () {
    http({url: 'http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/match/json', method: 'GET'}).

    success(function (response) {
      scope.thesaurus = response;
      console.log(scope.thesaurus);
    });
  };  
}]);