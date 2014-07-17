angular.module('app.login', [
])
//currently Login is set up as a substate of app.main, will eventually make it its own state.
.config(function($stateProvider){
  $stateProvider
    .state('app.login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    });
})

.controller('LoginCtrl', function($scope, DialerFactory, $state, $window, $http){
  var user = $scope.currentUser;
  $scope.submit = function(){
    $window.localStorage.setItem('com.quickCall.auth',
    JSON.stringify({
      id:user.ID,
      token:user.token,
      number:user.number
    }
    ));
  };  
  //Login establishes the currentUser property of DialerFactory, that is injected into other views
  $scope.currentUser = DialerFactory.currentUser;
});