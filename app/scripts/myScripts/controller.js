'use strict';

$('table').hide();

var appModule = angular.module('appModule', []);

appModule.factory('sendDefinitionRequest', ['$http', function(http) {

  var returnDefinitionUrl = function (query) { 
    console.log(query);
    var definitionUrl = 'http://api.wordnik.com:80/v4/word.json/'+ query + '/definitions/';
    console.log(definitionUrl);
    return definitionUrl;
  };

  var requestFactory = function(query) {
    return http({
      url: returnDefinitionUrl(query),
      method: 'GET',
      params: {
        limit: 6,
        includeRelated: 'true',
        sourceDictionaries: 'all',
        api_key: '724583fdf72680c36d0010ad78b03b1c4f3ea7b27c651f094'
      }
    });
    
  };
  return requestFactory;
}]);

appModule.factory('sendThesaurusRequest', ['$http', function(http) {

  var returnThesaurusUrl = function (query) { 
    console.log(query);
    var thesaurusUrl = 'http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/' + query + '/json';
    console.log(thesaurusUrl);
    return thesaurusUrl;
  };

  var requestFactory = function(query) {
    return http({
      url: returnThesaurusUrl(query),
      method: 'GET'
    });
  };
  return requestFactory;
}]);

appModule.controller('definitionAndThesaurus', ['$scope', 'sendDefinitionRequest', 'sendThesaurusRequest', function(scope, sendDefinitionRequest, sendThesaurusRequest) {
    scope.definitionSearch = function() {
      sendDefinitionRequest(scope.query).success(function(response) {
      scope.wordResponses = response;
      console.log(scope.wordResponses);
    });
    };

    scope.thesaurusSearch = function() {
      sendThesaurusRequest(scope.query).success(function(response) {
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
            else {
              scope.nounAntonym = value;
              console.log(scope.nounAntonym);
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
            else {
              scope.verbAntonym = value;
              console.log(scope.verbAntonym);
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
            else {
              scope.adverbAntonym = value;
              console.log(scope.adverbAntonym);
            }
          });
        }
        else if (key == 'adjective') {
          scope.adjectiveThesaurus = value;
          angular.forEach(scope.adjectiveThesaurus, function(value, key) {
            if (key == 'syn' || key == 'rel') {
              scope.adjectiveSynonym = value;
              console.log(scope.adjectiveSynonym);
            }
            else if (key == 'ant') {
              scope.adjectiveAntonym = value;
              console.log(scope.adjectiveAntonym);
            }
          });
        }

        if (!scope.thesaurus.hasOwnProperty('noun')) {
          $('.noun').hide();
        } else {
          $('.noun').show();
        }

        if (!scope.thesaurus.hasOwnProperty('verb')) {
          $('.verb').hide();
        } else {
          $('.verb').show();
        }

        if (!scope.thesaurus.hasOwnProperty('adverb')) {
          $('.adverb').hide();
        } else {
          $('.adverb').show();
        }

        if (!scope.thesaurus.hasOwnProperty('adjective')) {
          $('.adjective').hide();
        } else {
          $('.adjective').show();
        }
      });
      });
    };

    scope.search = function() {
      scope.definitionSearch();
      scope.thesaurusSearch();
      $('table').show();
    };
}]);