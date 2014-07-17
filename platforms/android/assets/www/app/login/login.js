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
    $http({
      method: 'GET', 
      url: 'http://quickcall-server.herokuapp.com/account',
      params:{
        authId:user.ID,
        authToken:user.token
      }
    })
    .success(function(data, status, headers, config) {
      var tokens = parseInt(data.cash_credits)
      if(data.auth_id === user.ID && tokens > 1){
        $window.localStorage.setItem('com.quickCall.auth',
        JSON.stringify({
          id:user.ID,
          token:user.token,
          number:user.number
        })
        );
      }
    })
    .error(function(data, status, headers, config) {
      console.error(data);
    });
   
  };  
  //Login establishes the currentUser property of DialerFactory, that is injected into other views
  $scope.currentUser = DialerFactory.currentUser;
});
