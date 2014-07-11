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
  $scope.numbers = '';
  $scope.addInput = function(num) {
    $scope.numbers += num;
  };
  $scope.makeCall = function() {
    DialerFactory.call($scope.numbers);
  };
})

.factory('DialerFactory', function($http) {
  var call = function(number) {
    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(number)
    }).then(function(err, data) {
      return data.results;
    });
  };

  return {
    call: call
  };

})

.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html'
  };
});
