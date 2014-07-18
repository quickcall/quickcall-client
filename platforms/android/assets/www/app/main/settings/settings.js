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
.controller('SettingsCtrl', function($scope, $ionicModal, DialerFactory, $state){

  //get currentUser to display in settings page
  $scope.currentUser = DialerFactory.currentUser;
  console.log($scope.currentUser);

})
.directive('swipeRight', function($state, $gestureProvider) {
  return {
    restrict: 'A',
    templateUrl: 'app/main/settings/settings.html',
    scope: true,
    link: function(scope, elem, attr) {
      $gestureProvider.on('dragright', function(e) {
        e.preventDefault();
        $state.go('app/main/dialer');
      }, elem);
    }
  };
});