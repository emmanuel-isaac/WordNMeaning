'use strict';

var thesaurusEngine = {
  nounDetermine: function(key) {
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
  }
};