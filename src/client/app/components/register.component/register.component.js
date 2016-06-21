(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('registerComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: registerController,
      templateUrl: 'app/components/register.component/register.html'
    });

  registerController.$inject = ['$rootScope', '$location', '$localStorage', 'Auth'];
  function registerController($rootScope, $location, $localStorage, Auth){
    var ctrl = this;
    function successAuth(res) {
      console.log(res);
         console.log(res.token);
      if (res.token){
        $localStorage.token = res.token;
        $localStorage.email = res.email;
        $localStorage.name = res.name;
        $localStorage.user_id = res.user_id;
        console.log("Successfully registered in!");
        window.location = "/";
      } else {
        console.log("login Failed");
      }
    }
    ctrl.register = function () {
      var formData = {
          name: ctrl.name,
          email: ctrl.email,
          password: ctrl.password
      };

      Auth.register(formData, successAuth, function () {
          $rootScope.error = 'Failed to signup';
      });
    };
  }
})();
