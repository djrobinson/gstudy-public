(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('showComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: showController,
      templateUrl: 'app/components/show.component/show.html'
    });

  showController.$inject = ['deckService'];

  function showController(deckService){
    var ctrl = this;
    this.$routerOnActivate = function(next, previous) {
        var id = next.params.id;
        deckService.getDeck(id).then(function(deck) {
          ctrl.deck = deck[0];
        });
        deckService.getQuestions(id).then(function(questions){
          ctrl.deckQuestions = questions;
        });
      };
    }
})();