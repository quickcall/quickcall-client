angular.module('app.auth', [
])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: '/home',
        templateUrl: 'app/login/home.html',
        controller: 'AuthController', 
        authenticate: false
      })
      .state('app.register', {
        url: '/register',
        templateUrl: 'app/login/register.html',
        controller: 'AuthController',
        authenticate: false
      })
      .state('app.login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'AuthController',
        authenticate: false
      });
  })

  .controller('AuthController', function($scope, $state, $window, $http, $ionicPopup, LoginFactory) {
    // <<- userInput for register.html form
    $scope.register = function() {
      var registerPayload = { 
        email: $scope.email, 
        password: $scope.password, 
        phoneNumber: $scope.phoneNumber
      }; 

      return LoginFactory.register(registerPayload);
    };

    // <<- userInput for login.html form
    $scope.login = function() {
      var loginPayload = {
        email: $scope.email, 
        password: $scope.password
      };
    
      return LoginFactory.login(loginPayload);
    };
  });