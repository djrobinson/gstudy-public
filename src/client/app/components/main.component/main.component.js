(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('mainComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: mainController,
      templateUrl: 'app/components/main.component/main.html'
    });
    //socketService was removed
  mainController.$inject = ['$scope','$localStorage','deckService','NotificationService', 'SocketService'];
  function mainController($scope, $localStorage, deckService, NotificationService, SocketService){
    var ctrl = this;
    var user_id = $localStorage.user_id;

    ctrl.userDecks = function(){
      ctrl.mine = true;
      ctrl.all = false;
      deckService.getUserDecks(user_id)
      .then(function(data){
        ctrl.decks = data;
      });
    };
    //Call immediately on initial load
    ctrl.userDecks();

    ctrl.allDecks = function(){
      ctrl.mine = false;
      ctrl.all = true;
      deckService.getDecks()
      .then(function(data){
        var copyableDecks = data.filter(function(deck){
          if (deck.user_id !== user_id){
            deck.copy = true;
            return  deck;
          }
        });
        ctrl.decks = copyableDecks;
      });
    };

    ctrl.copyDeck = function(deck){
      var newDeck = {
        title: deck.title,
        description: deck.description,
        updated: new Date(),
        img_url: deck.img_url,
        user_id: user_id
      };
      deckService.createDeck(newDeck)
        .then(function(data){
          console.log("your deck created!");
        });
    };

    SocketService.forward('status', $scope);
    $scope.$on('socket:status', function (ev, data) {
      console.log(ev, data);
    });

    ctrl.getNotif = function(){
      NotificationService.get().then(function (notifications) {
        ctrl.notifications = notifications.data;
        ctrl.unreadCount = ctrl.notifications.filter(function (notif) {
          return !notif.read;
        }).length;
      });
    };

    ctrl.getNotif();

    ctrl.markAsRead = markAsRead;

    SocketService.forward('notification.read', $scope);
    $scope.$on('socket:notification.read', function (ev, msg) {
      ctrl.unreadCount -= 1;
    });

    SocketService.forward('notification.create', $scope);
    $scope.$on('socket:notification.create', function (ev, notification) {
      console.log(notification);
      console.log(ev);
      ctrl.notifications.push(notification);
      ctrl.unreadCount += 1;
      ctrl.getNotif();
    });

    function markAsRead (notif) {
      console.log(notif);
      if ( notif.read ) { ctrl.selected = notif; }
      else {
        NotificationService.read(notif.id)
        .then(function (notification) {
          var selected = ctrl.notifications.filter(function (notif) {
            return notif.id === notification.data[0].id;
          })[0];
          selected.read = true;
          ctrl.selected = selected;
        });
      }
    }
  }
})();