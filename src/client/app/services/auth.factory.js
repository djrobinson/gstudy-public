angular.module('gStudyApp')
.factory('Auth', ['$http', '$localStorage', function ($http, $localStorage) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {
           register: function (data, success, error) {
               $http.post('/auth/register', data).success(success).error(error);
           },
           login: function (data, success, error) {
                // $localStorage.token = data.data.token;
                $http.post('/auth/login', data).success(success).error(error);
           },
           logout: function (success) {
            console.log("Loguout");
               tokenClaims = {};
               delete $localStorage.token;
               delete $localStorage.email;
               delete $localStorage.name;
               delete $localStorage.user_id;
               success();
           },
           getTokenClaims: function () {
               return tokenClaims;
           }
       };
   }
]);