angular.module('app.main.login', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.login', {
      url: '/login',
      views: {
        'login': {
          templateUrl: 'app/main/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
})
.controller('LoginCtrl', function($scope, DialerFactory){
  $scope.currentUser = DialerFactory.currentUser;

});