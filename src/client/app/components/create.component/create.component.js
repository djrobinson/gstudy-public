(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('createComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: createController,
      templateUrl: 'app/components/create.component/create.html'
    });

  createController.$inject = ['$localStorage', '$rootRouter','deckService', 'NotificationService'];
  function createController($localStorage, $rootRouter, deckService, NotificationService){
    var ctrl = this;

    ctrl.questions = [0];

    ctrl.addQuestion = function(){
      var ques = ctrl.questions;
      var next = ques[ques.length] + 1;
      ctrl.questions.push(next);
    };

    ctrl.createDeck = function(){
      if (ctrl.deck){
        var deck = ctrl.deck;
        var questions = ctrl.questions;
        deck.updated = new Date();
        deck.user_id = $localStorage.user_id;
        deckService.createDeck(deck)
        .then(function(data){
        var notification = {
          user: $localStorage.name,
          content: $localStorage.name + ' just created a deck: ' + deck.title
        };
        NotificationService.create(notification)
          .then(function(notData){
            questions.forEach(function(question){
              question.deck_id = data[0];
              deckService.createQuestion(question)
              .then(function(qData){
                $rootRouter.navigate(['Main']);
              });
            });
          });
        });
      }
    };
  }
})();