angular.module('app.main.dialer', [
  'ngCordova'
])
//configuration for the dialer state
.config(function($stateProvider){
  $stateProvider
    .state('app.main.dialer', {
      url: '/dialer',
      views: {
        'dialer': {
          templateUrl: 'app/main/dialer/dialer.html',
          controller: 'DialerCtrl'
        }
      }
    });
})
.controller('DialerCtrl', function($scope, DialerFactory, $state, $window){
  //Stores the three most recently called numbers to display on Dialer View
  $scope.recentNumbers = DialerFactory.recentNumbers;

  // $scope.username = DialerFactory.currentUser.username;

  //If there is no user saved redirect to the login page
  if(!$window.localStorage.getItem('com.quickCall.auth')){
    $state.go('app.main.login');
  }
  //Number that is displayed on dialer input
  $scope.phoneNumber = '';
  //Adds number to the phoneNumber string
  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
  };
  //Removes the last number in the string
  $scope.removeInput = function(){
    $scope.phoneNumber = $scope.phoneNumber.slice(0,-1);
  };
  //Sends Http request to server with phoneNumber then resets the number back to ''
  $scope.makeCall = function() {
    DialerFactory.call($scope.phoneNumber);
    $scope.phoneNumber = '';
  };


})
//Dialer directive, dialer-directive.html is the template
.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html',
    replace: true,
    scope: true
  };
});