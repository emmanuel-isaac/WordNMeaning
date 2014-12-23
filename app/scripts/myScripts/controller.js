'use strict';

$('table').hide();

// APPLICATION MODULE
var appModule = angular.module('appModule', []);

// DEFINITION REQUEST FACTORY
appModule.factory('sendDefinitionRequest', ['$http', function (http) {

  var returnDefinitionUrl = function (query) {
    console.log(query);
    var definitionUrl = 'http://api.wordnik.com:80/v4/word.json/' + query + '/definitions/';
    console.log(definitionUrl);
    return definitionUrl;
  };

  var requestFactory = function (query) {
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

// THESAURUS REQUEST FACTORY
appModule.factory('sendThesaurusRequest', ['$http', function (http) {

  var returnThesaurusUrl = function (query) {
    console.log(query);
    var thesaurusUrl = 'http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/' + query + '/json';
    console.log(thesaurusUrl);
    return thesaurusUrl;
  };

  var requestFactory = function (query) {
    return http({
      url: returnThesaurusUrl(query),
      method: 'GET'
    });
  };
  return requestFactory;
}]);


// APPLICATION CONTROLLER 
appModule.controller('definitionAndThesaurus', ['$scope', 'sendDefinitionRequest', 'sendThesaurusRequest', function (scope, sendDefinitionRequest, sendThesaurusRequest) {

    // THE DEFINITION FUNCTION
  scope.definitionSearch = function () {

    sendDefinitionRequest(angular.lowercase(scope.query)).
    success(function (response) {
      scope.wordResponses = response;
      $('img').hide();
      $('.Definition').show();
      $('.Thesaurus').show();
    }).
    error(function (data, status) {
      $('.responseAlert').show();
    });
  }; // ENDS scope.definitionSearch

    // THE THESAURUS FUNCTION
  scope.thesaurusSearch = function () {
    sendThesaurusRequest(scope.query).success(function (response) {

      scope.thesaurus = response;
      $('img').hide();
      $('.responseAlert').hide();

      // DETERMINES THE PART OF SPEECH A WORD BELONGS TO
      // ITERATION OVER KEYS AND VALUES IN RESPONSE -- SCOPE.THESAURUS
      angular.forEach(scope.thesaurus, function (value, key) {

        if (key == 'noun') {
          scope.nounThesaurus = value;
          angular.forEach(scope.nounThesaurus, function (value, key) {
            if (key == 'syn') {
              scope.nounSynonym = value;
            } else {
              scope.nounAntonym = value;
            }
          });
        } else if (key == 'verb') {
          scope.verbThesaurus = value;
          angular.forEach(scope.verbThesaurus, function (value, key) {
            if (key == 'syn') {
              scope.verbSynonym = value;
            } else {
              scope.verbAntonym = value;
            }
          });
        } else if (key == 'adverb') {
          scope.adverbThesaurus = value;
          angular.forEach(scope.adverbThesaurus, function (value, key) {
            if (key == 'syn') {
              scope.adverbSynonym = value;
            } else {
              scope.adverbAntonym = value;
            }
          });
        } else if (key == 'adjective') {
          scope.adjectiveThesaurus = value;
          angular.forEach(scope.adjectiveThesaurus, function (value, key) {
            if (key == 'syn' || key == 'rel') {
              scope.adjectiveSynonym = value;
            } else if (key == 'ant') {
              scope.adjectiveAntonym = value;
            }
          });
        }


        // REMOVING EMPTY PART OF SPEECH COLUMNS ON WORD SEARCH
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
    }).error(function (data, status, headers, config) {
      console.log(status);
      $('table').hide();
      $('.responseAlert').show();
    });
  };

    // TRIGGERS DEFINITION AND THESAURUS SEARCH ON THE CLICK OF ONE BUTTON
    scope.search = function () {
      if(scope.query.trim() !== '') {
        $('img').show();
        $('.alert').hide();
        scope.definitionSearch();
        scope.thesaurusSearch();
        $('table').show();
      } else {
        $('.alert').show();
        $('.Definition').hide();
        $('.Thesaurus').hide();
      } 
    };
}]);