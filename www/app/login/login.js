angular.module('app.login', [
])
//currently Login is set up as a substate of app.main, will eventually make it its own state.
.config(function($stateProvider){
  $stateProvider
    .state('app.login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('app.signup', {
      url: '/signup',
      templateUrl: 'app/login/signup.html',
      controller: 'LoginCtrl'
    });
})

.controller('LoginCtrl', function($scope, LoginFactory, $state, $window, $http, $ionicPopup){
  //forms input on login.html
  $scope.userInput = LoginFactory.userInput;
  var user = $scope.userInput;
  $scope.submit = function(){
    return LoginFactory.submit(user);
  };
  
});