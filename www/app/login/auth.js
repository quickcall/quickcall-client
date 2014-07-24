angular.module('app.auth', [
])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: '/home',
        templateUrl: 'app/login/home.html',
        controller: 'AuthController'
      })
      .state('app.register', {
        url: '/register',
        templateUrl: 'app/login/register.html',
        controller: 'AuthController',
      })
      .state('app.login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'AuthController'
      });
  })

  .controller('AuthController', function($scope, $state, $window, $http, $ionicPopup, LoginFactory) {
    $scope.register = function() {
      var registerPayload = { 
        email: $scope.email, 
        password: $scope.password, 
        phoneNumber: $scope.phoneNumber
      }; 

      return LoginFactory.register(registerPayload);
    };

    $scope.login = function() {
      var loginPayload = {
        email: $scope.email, 
        password: $scope.password
      };
    
      return LoginFactory.login(loginPayload);
    };

    // <<- redirect user from app.home to app.register or app.login 
    $scope.redirectToRegister = function() {
      $state.go('app.register');
    };

    $scope.redirectToLogin = function() {
      $state.go('app.login');
    };
  });