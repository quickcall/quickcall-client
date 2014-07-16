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
.controller('LoginCtrl', function($scope, DialerFactory, $state, $window){
	$scope.submit = function(userID, userToken, userNumber){
	  var plivoPost = userID + ":" + userToken;
		$window.localStorage.setItem('com.quickCall.auth',JSON.stringify({id:userID,token:userToken,number:userNumber}));
	    var credentials = JSON.parse($window.localStorage.getItem('com.quickCall.auth'));
	};  
  //Login establishes the currentUser property of DialerFactory, that is injected into other views
  $scope.currentUser = DialerFactory.currentUser;
});