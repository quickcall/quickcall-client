angular.module('app.main.settings', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.settings', {
      url: '/settings',
      views: {
        'settings': {
          templateUrl: 'app/main/settings/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    });
})
//Currently there are no real settings, we should add those (^◡^ )
.controller('SettingsCtrl', function($scope, $ionicModal, DialerFactory, $state, $ionicGesture){
  //get currentUser to display in settings page
  $scope.currentUser = DialerFactory.currentUser;

  $scope.swipeRight = function() {
    $state.go('app.main.dialer');
  };

});
// .directive('swipeRight', function($state, $gestureProvider, $window) {
//   return {
//     restrict: 'A',
//     templateUrl: 'app/main/settings/settings.html',
//     scope: {},
//     link: function(scope, elem, attr) {
//       scope.elem = elem;
//       elem.on('swipe', function() {
//         $window.history.back();
//       });
//     }
//   };
// });