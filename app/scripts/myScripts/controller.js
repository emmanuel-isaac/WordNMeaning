'use strict';

var wordNMeaningApp = angular.module('wordNMeaningApp', []);

wordNMeaningApp.controller('wordDefinitionController', ['$scope', '$http', function (scope, http) {

  scope.returnDefinitionUrl = function (query) { 
    console.log(scope.query);
    var definitionUrl = 'http://api.wordnik.com:80/v4/word.json/'+ scope.query + '/definitions/';
    console.log(definitionUrl);
    return definitionUrl;
  };

  scope.definitionSearch = function () {

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

      scope.wordResponses = response;
      console.log(scope.wordResponses);
    });
  };    
}]);


wordNMeaningApp.controller('wordThesaurusController', ['$scope', '$http', function (scope, http) {


  scope.returnThesaurusUrl = function (query) { 
    console.log(scope.query);
    var thesaurusUrl = 'http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/' + scope.query + '/json';
    console.log(thesaurusUrl);
    return thesaurusUrl;
  };

  scope.thesaurusSearch = function () {
    http({

      url: scope.returnThesaurusUrl(),
      method: 'GET'

    }).
    success(function (response) {

      scope.thesaurus = response;
      console.log(scope.thesaurus);

      angular.forEach(scope.thesaurus, function (value, key) {
        if (key == 'noun') {
          scope.nounThesaurus = value;
          angular.forEach(scope.nounThesaurus, function (value, key) {
            if (key == 'syn') {
              scope.nounSynonym = value;
              console.log(scope.nounSynonym);
            }
          });
        } 
        else if (key == 'verb') {
          scope.verbThesaurus = value;
          angular.forEach(scope.verbThesaurus, function(value, key) {
            if (key == 'syn') {
              scope.verbSynonym = value;
              console.log(scope.verbSynonym);
            }
          });
        }
        else if (key == 'adverb') {
          scope.adverbThesaurus = value;
          angular.forEach(scope.adverbThesaurus, function(value, key) {
            if (key == 'syn') {
              scope.adverbSynonym = value;
              console.log(scope.adverbSynonym);
            }
          });
        }
      });

      // angular.forEach(scope.thesaurus, function(value, key) {
      //   console.log(value);
      //   scope.synonym = value;

      //   angular.forEach(scope.synonym, function (value, key) {
      //     console.log(value);
      //     this.push(value);
      //   }, scope.synonymValue);
      // }, scope.log);

      // console.log(scope.log);

      // var values = {name: 'misko', gender: 'male'};
// var log = [];
// angular.forEach(values, function(value, key) {
//   this.push(key + ': ' + value);
// }, log);
// expect(log).toEqual(['name: misko', 'gender: male']);
      // console.log(response);
      // console.log(scope.synonymValue);

      // angular.forEach(scope.synonymValue, function(value, key) {});

    });



  };  
}]);
















