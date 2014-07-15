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
.controller('DialerCtrl', function($scope, DialerFactory, $state, $ionicGesture){

  $scope.recentNumbers = DialerFactory.recentNumbers;
  $scope.show = false;

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

  $scope.username = DialerFactory.currentUser.username || 'Kia';
  console.log(DialerFactory.currentUser);
})
.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html',
    replace: true,
    scope: true
  };
});