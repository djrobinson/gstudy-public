(function(){
    'use strict'

    angular
        .module('gStudyApp')
        .factory('scoresService', scoresService);

    scoresService.$inject = ['$http', '$log'];

    function scoresService($http, $log) {
        return {
            createScore: createScore,
            updateScore: updateScore,
            addWrong: addWrong,
            getWrongs: getWrongs
        };

        function createScore(score) {
            return $http.post('/api/scores/create', score)
                .then(scoreComplete)
                .catch(scoreComplete);

            function scoreComplete(response) {
                console.log(response.data);
                return response.data;
            }

            function scoreFailed(error) {
                $log.error('XHR Failed for score.' + error.data);
            }
        }

        function updateScore(score) {
            console.log(score);
            return $http.put('/api/scores/update', score)
                .then(scoreComplete)
                .catch(scoreComplete);

            function scoreComplete(response) {
                console.log(response.data);
                return response.data;
            }

            function scoreFailed(error) {
                $log.error('XHR Failed for score.' + error.data);
            }
        }

        function addWrong(user_id, question_id, deck_id){
            var question = {
                user_id: user_id,
                question_id: question_id,
                deck_id: deck_id,
                updated: new Date()
            };
            return $http.post('/api/wrongs/create', question)
                .then(scoreComplete)
                .catch(scoreComplete);

            function scoreComplete(response) {
                console.log(response.data);
                return response.data;
            }

            function scoreFailed(error) {
                $log.error('XHR Failed for wrongs.' + error.data);
            }
        }

        function getWrongs(user_id, deck_id){
            return $http.get('/api/wrongs/'+user_id+'/'+deck_id)
                .then(scoreComplete)
                .catch(scoreComplete);

            function scoreComplete(response) {
                console.log(response.data);
                return response.data;
            }

            function scoreFailed(error) {
                $log.error('XHR Failed for wrongs.' + error.data);
            }
        }
    }
})();