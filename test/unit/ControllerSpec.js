'use strict';

describe ('appModule', function () {
  describe ('definitionAndThesaurus', function () {

    var scope;
    var controller;
    var httpGet;
    var sendThes;
    var sendDef;

    beforeEach(module('appModule'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, $sendThesaurusRequestBack, $sendDefinitionRequestBack) {
      scope = $rootScope.$new();
      httpGet = _$httpBackend_;
      sendThes = $sendThesaurusRequestBack;
      sendDef = $sendDefinitionRequestBack;
      controller = $controller('definitionAndThesaurus', {
        $scope:scope
      });
    }));

      var a = sendThes('read');

      it('should have a success property', function () {
        expect(a.hasOwnProperty('success')).toBe(true);
      });

    //   httpGet.expectGET("http://api.wordnik.com/v4/word.json/speech/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=724583fdf72680c36d0010ad78b03b1c4f3ea7b27c651f094").
    //     respond(
    //       [
    //         {
    //           textProns: [],
    //           partOfSpeech: 'noun',
    //           text: "The faculty or act of expressing or describing thoughts, feelings, or perceptions by the articulation of words.",
    //           score: 0
    //         },
    //         {
    //           textProns: [],
    //           partOfSpeech: 'noun',
    //           text: "The faculty or act of speaking.",
    //           score: 0
    //         }
    //       ]
    //     );
    // }));

    // it('should return an array', function () {
    //   expect(scope.definitions).toBeUndefined();
    //   httpGet.flush();
    //   expect(Array.isArray(scope.wordResponse)).toBe(true);
    // });

    // it('should have two objects embedded in it with keys and values', function () {
    //   httpGet.flush();
    //   expect(scope.wordResponse).toEqual(
    //     [
    //       {
    //         textProns: [],
    //         partOfSpeech: 'noun',
    //         text: "The faculty or act of expressing or describing thoughts, feelings, or perceptions by the articulation of words.",
    //         score: 0
    //       },
    //       {
    //         textProns: [],
    //         partOfSpeech: 'noun',
    //         text: "The faculty or act of speaking.",
    //         score: 0
    //       }
    //     ]
    //   );
    // });

    // it('partOfSpeech property of the first object should have the value noun', function () {
    //   httpGet.flush();
    //   expect(scope.wordResponse[0].partOfSpeech).toEqual('noun');
    // });

    // it('the score property of the second object should have the value 0', function () {
    //   httpGet.flush();
    //   expect(scope.wordResponse[1].score).toEqual(0);
    // });
  });
});