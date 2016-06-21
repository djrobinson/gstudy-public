(function(){
  'use strict';
  angular
    .module('gStudyApp')
    .component('currentScore', {
      bindings: {
        score: '=',
      },
      controller: scoreController,
      templateUrl: 'app/components/play.component/score.html'
    });
  scoreController.$inject = ['deckService'];
  function scoreController(deckService){
    }
})();