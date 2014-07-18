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
.controller('SettingsCtrl', function($scope, $ionicModal, DialerFactory, $state, $window){
  $scope.currentUser = DialerFactory.currentUser = JSON.parse($window.localStorage.getItem('com.quickCall.auth'));

  //get currentUser to display in settings page
  //redirect if there is no user, need user for app to work
  // if(!$scope.username){
  //   $state.go('app.main.login');
  // }
});