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
  /*setting currentUser on scope to be equal to local storage, we can't set the currentUser in the dialer factory
  because nothing will be added to local storage until a user actually signs up*/
  $scope.currentUser = DialerFactory.currentUser = JSON.parse($window.localStorage.getItem('com.quickCall.auth'));
});