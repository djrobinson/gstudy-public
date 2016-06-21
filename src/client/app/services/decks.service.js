(function(){
    'use strict'

    angular
        .module('gStudyApp')
        .factory('deckService', deckService);

    deckService.$inject = ['$http', '$log'];

    function deckService($http, $log) {
        return {
            getDecks: getDecks,
            getUserDecks: getUserDecks,
            getDeck: getDeck,
            createDeck: createDeck,
            createQuestion: createQuestion,
            getQuestions: getQuestions
        };

        function getDecks() {
            return $http.get('/api/decks')
                .then(decksComplete)
                .catch(decksComplete);

            function decksComplete(response) {
                return response.data;
            }

            function decksFailed(error) {
                $log.error('XHR Failed for decks.' + error.data);
            }
        }

        function getUserDecks(user_id){
            return $http.get('/api/decks/'+user_id+'/user')
                .then(decksComplete)
                .catch(decksComplete);

            function decksComplete(response) {
                return response.data;
            }

            function decksFailed(error) {
                $log.error('XHR Failed for decks.' + error.data);
            }
        }

        function getDeck(id){
            return $http.get('/api/decks/'+id+'/deck')
                .then(decksComplete)
                .catch(decksComplete);

            function decksComplete(response) {
                return response.data;
            }

            function decksFailed(error) {
                $log.error('XHR Failed for decks.' + error.data);
            }
        }

        function createDeck(deck) {
            return $http.post('/api/decks/create', deck)
                .then(createDeckComplete)
                .catch(createDeckFailed);

            function createDeckComplete(response) {
                return response.data;
            }

            function createDeckFailed(error) {
                $log.error('XHR Failed for decks.' + error.data);
            }
        }

        function createQuestion(question){
            return $http.post('/api/questions/create', question)
                .then(createQuestionComplete)
                .catch(createQuestionFailed);

            function createQuestionComplete(response) {
                return response.data;
            }

            function createQuestionFailed(error) {
                $log.error('XHR Failed for questions.' + error.data);
            }
        }

        function getQuestions(deck_id){
            return $http.get('/api/questions/'+deck_id)
                .then(questionsComplete)
                .catch(questionsFailed);

            function questionsComplete(response) {
                return response.data;
            }

            function questionsFailed(error) {
                $log.error('XHR Failed for questions.' + error.data);
            }
        }
    }
})();