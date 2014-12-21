'use strict';
var appModule = angular.module('appModule', ['wordNMeaningApp']);

appModule.controller('appController', ['$scope', function (scope) {
  scope.appFunction = function () {
    console.log('clicked');
    scope.wordDefinitionController.definitionSearch();
  };
}]);