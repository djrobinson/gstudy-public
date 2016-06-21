(function(){
'use strict';
angular
  .module('gStudyApp', ['ngComponentRouter', 'ngStorage', 'ngMessages', 'btford.socket-io'])

  .config(function($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(['$q', '$rootScope', '$rootRouter', '$localStorage', function ($q, $rootScope, $rootRouter, $localStorage) {
    return {
       'request': function (config) {
           config.headers = config.headers || {};
           if ($localStorage.token) {
              $rootScope.loggedIn = true;
              config.headers['x-access-token'] = $localStorage.token;
           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
              $rootScope.loggedIn = false;
              $rootRouter.navigate(['Login']);
           }
           return $q.reject(response);
       }
   };
  }]);
})

.value('$routerRootComponent', 'home')

.component('home', {
  templateUrl: 'app/template.html',
  $routeConfig: [
    {path: '/login', name: 'Login', component: 'loginComponent'},
    {path: '/register', name: 'Register', component: 'registerComponent' },
    {path: '/home', name: 'Main', component: 'mainComponent', useAsDefault: true},
    {path: '/create', name: 'Create', component: 'createComponent'},
    {path: '/show/:id', name: 'Show', component: 'showComponent'},
    {path: '/play/:id', name: 'Play', component: 'playComponent'}
  ],
  controller: logoutController
});



logoutController.$inject = ['$rootRouter', '$localStorage', '$rootScope', 'Auth'];
function logoutController($rootRouter, $localStorage, $rootScope, Auth){
  var ctrl = this;
  ctrl.logout = function () {
         Auth.logout(function () {
            $rootScope.loggedIn = false;
            $rootRouter.navigate(['Login']);
         });
     };
}
})();
