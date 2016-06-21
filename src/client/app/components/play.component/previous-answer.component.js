(function(){
  'use strict';
  angular
    .module('gStudyApp')
    .component('previousAnswers', {
      bindings: {
        answers: '=',
      },
      controller: previousController,
      templateUrl: 'app/components/play.component/previous.html'
    });

  function previousController(){
    }
})();