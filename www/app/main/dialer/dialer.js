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
.controller('DialerCtrl', function($scope){
  $scope.numbers = '';
  // $scope.numbers.src = '';
  $scope.addInput = function(num) {
    $scope.numbers += num;
    console.log(num);
  };
})

.factory('DialerFactory', function($http) {
  var call = $http({
    method: 'POST',
    url: 'http://simple-dialer.herokuapp.com/call',
    data: JSON.stringify()
  }).then(function(err, data) {
    return data.results;
  });

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
