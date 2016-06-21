(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('playComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: playController,
      templateUrl: 'app/components/play.component/play.html'
    });

  playController.$inject = ['$location', '$localStorage','$rootRouter','deckService', 'scoresService', 'NotificationService'];

  function playController($location, $localStorage, $rootRouter, deckService, scoresService, NotificationService){
    var ctrl = this;
    ctrl.questions = [];
    var current = 0;
    ctrl.previousQuestions = [];
    var wrongs = [];
    var id = 0;
    var user_id = $localStorage.user_id;
    this.$routerOnActivate = function(next, previous) {
      id = next.params.id;
      deckService.getDeck(id)
      .then(function(data){
        ctrl.deckTitle = data[0].title;
      });
      scoresService.getWrongs(user_id, id)
      .then(function(questions){
        questions.forEach(function(question){
          wrongs.push(question.question_id);
        });
      });
      deckService.getQuestions(id)
      .then(function(questions){
        var deckQuestions = questions;
        var missedQuestions = [];
        deckQuestions.forEach(function(ques){
          console.log(ques.id);
          if (wrongs.indexOf(ques.id) !== -1){
            missedQuestions.push(ques);
            missedQuestions.push(ques);
          } else {
            missedQuestions.push(ques);
          }
        });
        ctrl.questions = shuffle(missedQuestions);
        console.log(ctrl.questions);
        ctrl.show = false;
        ctrl.done = false;
        ctrl.question = ctrl.questions[current];
      });
      var score = {
        user_id: user_id,
        deck_id: id,
        num_right: 0,
        num_wrong: 0,
        updated: new Date()
      };
      scoresService.createScore(score).then(function(score){
        ctrl.score = score;
      });
    };

    ctrl.nextQuestion = function(score, result){
      if (current === ctrl.questions.length - 1){
        ctrl.done = true;
      } else {
        current++;
      }
      ctrl.show = false;
      ctrl.question = ctrl.questions[current];
      ctrl.previousQuestions.push(ctrl.question);
      if (result === true){
        score.num_right = score.num_right + 1;
        scoresService.updateScore(score).then(function(data){
          score = data;
        });
      } else {
        //ADD WRONG QUESTION TO THE WRONGS TABLE
        scoresService.addWrong(user_id, ctrl.question.id, id)
        .then(function(data){
          console.log("wrong added: ",data);
        });
        //UPDATE OVERALL SCORE
        score.num_wrong = score.num_wrong + 1;
        scoresService.updateScore(score)
        .then(function(data){
          score = data;
        });
      }

    };
    ctrl.showAnswer = function(){
      ctrl.show = true;
    };
    ctrl.home = function(){
      if (ctrl.score[0].num_wrong === 0){
        var notification = {
          user: $localStorage.name,
          content: $localStorage.name + ' just scored a 100% on ' + ctrl.deckTitle
        };
        NotificationService.create(notification)
          .then(function(notData){
            console.log(notData);
          });
      }
      $rootRouter.navigate(['Main']);
    };
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }
})();