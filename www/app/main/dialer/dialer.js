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
.controller('DialerCtrl', function($scope, DialerFactory, $state){
  //Stores the three most recently called numbers to display on Dialer View
  $scope.recentNumbers = DialerFactory.recentNumbers;

  $scope.username = DialerFactory.currentUser.username;
  //???
  $scope.show = false;
  //If there is no user save redirect to the login page
  if(!$scope.username){
    $state.go('app.main.login');
  }
  //Number that is displayed on dialer input
  $scope.phoneNumber = '';
  //Adds number on button click to the phoneNumber string to be sent to server
  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
  };
  //Sends Http request to server with phoneNumber then resets the number back to ''
  $scope.makeCall = function() {
    DialerFactory.call($scope.phoneNumber);
    $scope.phoneNumber = '';
  };
  //Removes the last number in the string on click
  $scope.removeInput = function(){
    $scope.phoneNumber = $scope.phoneNumber.slice(0,-1);
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