angular.module('app.main.login', [
])
//currently Login is set up as a substate of app.main, will eventually make it its own state.
.config(function($stateProvider){
  $stateProvider
    .state('app.main.login', {
      url: '/login',
      views: {
        //name of the subview
        'login': {
          templateUrl: 'app/main/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
})
.controller('LoginCtrl', function($scope, DialerFactory){
  //Login establishes the currentUser property of DialerFactory, that is injected into other views
  $scope.currentUser = DialerFactory.currentUser;
});