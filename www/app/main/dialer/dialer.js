angular.module('app.main.dialer', [
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
.controller('DialerCtrl', function($scope, DialerFactory){
  $scope.show = false;

  $scope.showDialer = function() {
    if($scope.show === false) {
      $scope.show = true;
    }
  };

  $scope.phoneNumber = '';

  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
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
    templateUrl: 'app/main/dialer/dialer-directive.html'
  };
});
