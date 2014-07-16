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
.controller('SettingsCtrl', function($scope, $ionicModal, DialerFactory, $state){
  $scope.currentUser = DialerFactory.currentUser;
  $scope.username = $scope.currentUser.username;
  if(!$scope.username){
    $state.go('app.main.login');
  }
});