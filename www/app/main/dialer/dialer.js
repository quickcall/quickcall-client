angular.module('app.main.dialer', [
  'ngCordova'
])
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
  $scope.recentNumbers = DialerFactory.recentNumbers;
  $scope.username = DialerFactory.currentUser.username;
  console.log(DialerFactory.currentUser);
  console.log($scope.recentNumbers);
  $scope.show = false;
  
  if(!$scope.username){
    $state.go('app.main.login');
  }

  $scope.phoneNumber = '';

  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
    console.log($scope.phoneNumber);
  };
  $scope.makeCall = function() {
    DialerFactory.call($scope.phoneNumber);
    $scope.phoneNumber = '';
  };
  $scope.removeInput = function(){
    $scope.phoneNumber = $scope.phoneNumber.slice(0,-1);
  };

  
})
.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html',
    replace: true,
    scope: true
  };
});