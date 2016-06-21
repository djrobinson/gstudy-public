(function () {
  'use strict';

  angular.module('gStudyApp')
    .service('NotificationService', NotificationService)
    .service('SocketService', SocketService);

  NotificationService.$inject = ['$http'];

  function NotificationService ($http) {
    return {
      get: function () {
        return $http.get('/api/notifications');
      },
      read: function (id) {
        return $http.put('/api/notifications/' + id + '/read');
      },
      create: function (notification) {
        return $http.post('/api/notifications/create', notification);
      }
    };
  }

  SocketService.$inject = ['socketFactory'];

  function SocketService (socketFactory) {
    console.log("Socket Service is fired up");
    return socketFactory();
  }
})();
