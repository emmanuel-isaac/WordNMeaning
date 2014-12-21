'use strict';

var wordNMeaningApp = angular.module('wordNMeaningApp', []);

wordNMeaningApp.controller('wordDefinitionController', ['$scope', '$http', function (scope, http) {

  scope.returnDefinitionUrl = function () {
    var definitionUrl = 'http://api.wordnik.com:80/v4/word.json/'+ scope.query + '/definitions/';
    return definitionUrl; 
  };

  scope.definitionSearch = function () {
    console.log(scope.query);

    http({
      url: scope.returnDefinitionUrl(),
      method: 'GET',
      params: {
        limit: 7,
        includeRelated: 'true',
        sourceDictionaries: 'all',
        api_key: '724583fdf72680c36d0010ad78b03b1c4f3ea7b27c651f094'
      }
    }).
    success(function (response) {

      scope.wordResponse = response;
      console.log(scope.wordResponse);
    });
  };    
}]);


wordNMeaningApp.controller('wordThesaurusController', ['$scope', '$http', function (scope, http) {

  scope.thesaurusSearch = function () {
    console.log(scope.query);
    http({url: 'http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/match/json', method: 'GET'}).

    success(function (response) {
      scope.thesaurus = response;
      console.log(scope.thesaurus);
    });
  };  
}]);
















