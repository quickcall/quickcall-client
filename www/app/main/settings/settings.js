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
.controller('SettingsCtrl', function($scope, DialerFactory){
  $scope.currentUser = DialerFactory.currentUser;
  if(!$scope.currentUser.username || !$scope.currentUser.number){
    $scope.currentUser.username = prompt('WTF is u name!????');
    $scope.currentUser.number = prompt("WUT UR NUMBER!?");
  }
});