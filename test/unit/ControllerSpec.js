'use strict';

describe ('wordNMeaningApp', function () {
  describe ('wordDefinitionController', function () {

    var scope;
    var controller;
    var httpGet;

    beforeEach(module('wordNMeaningApp'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      httpGet = _$httpBackend_;
      controller = $controller('wordDefinitionController', {
        $scope:scope
      });
      httpGet.expectGET("http://api.wordnik.com/v4/word.json/speech/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=724583fdf72680c36d0010ad78b03b1c4f3ea7b27c651f094").
        respond(
          [
            {
              textProns: [],
              partOfSpeech: 'noun',
              text: "The faculty or act of expressing or describing thoughts, feelings, or perceptions by the articulation of words.",
              score: 0
            },
            {
              textProns: [],
              partOfSpeech: 'noun',
              text: "The faculty or act of speaking.",
              score: 0
            }
          ]
        );
    }));

    it('should return an array', function () {
      expect(scope.definitions).toBeUndefined();
      httpGet.flush();
      expect(Array.isArray(scope.wordResponse)).toBe(true);
    });

    it('should have two objects embedded in it with keys and values', function () {
      httpGet.flush();
      expect(scope.wordResponse).toEqual(
        [
          {
            textProns: [],
            partOfSpeech: 'noun',
            text: "The faculty or act of expressing or describing thoughts, feelings, or perceptions by the articulation of words.",
            score: 0
          },
          {
            textProns: [],
            partOfSpeech: 'noun',
            text: "The faculty or act of speaking.",
            score: 0
          }
        ]
      );
    });

    it('partOfSpeech property of the first object should have the value noun', function () {
      httpGet.flush();
      expect(scope.wordResponse[0].partOfSpeech).toEqual('noun');
    });

    it('the score property of the second object should have the value 0', function () {
      httpGet.flush();
      expect(scope.wordResponse[1].score).toEqual(0);
    });
  });

  describe('wordThesaurusController', function () {

    var scope;
    var controller;
    var httpGet;

    beforeEach(module('wordNMeaningApp'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      httpGet = _$httpBackend_;
      controller = $controller('wordThesaurusController', {$scope:scope});
      httpGet.expectGET('http://words.bighugelabs.com/api/2/f5c79d25e5e8f8723ee62b695a8a7987/match/json').
      respond(
      {
        noun: {
          syn: ['lucifer', 'catch', 'peer']
        },

        verb: {
          syn: ['fit', 'correspond', 'cope with'],
          ant: ['disagree']
        }
      }
      );
    }));

    it('should return an object', function () {
      expect(scope.thesaurus).toBeUndefined();
      httpGet.flush();
      expect(typeof scope.thesaurus).toBe('object');
      expect(Array.isArray(scope.thesaurus)).toBe(false);
    });    
  });
});