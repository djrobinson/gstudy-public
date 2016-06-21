(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('loginComponent', {
      bindings: {
        ngModel: '='
      },
      controller: loginController,
      templateUrl: 'app/components/login.component/login.html'
    });

loginController.$inject = ['$rootScope', '$location', '$rootRouter', '$localStorage', 'Auth'];
function loginController($rootScope, $location, $rootRouter, $localStorage, Auth){
    var ctrl = this;
    function successAuth(res) {

        if (res.token){
          $localStorage.token = res.token;
          $localStorage.email = res.email;
          $localStorage.name = res.name;
          $localStorage.user_id = res.user_id;
          console.log("Successfully logged in!");
          $rootRouter.navigate(['Main']);
        } else {
          console.log("login Failed");
        }
      }

     ctrl.login = function () {
         var formData = {
             email: ctrl.email,
             password: ctrl.password
         };

         Auth.login(formData, successAuth, function () {
             $rootScope.error = 'Invalid credentials.';
         });
     };
  }
})();
