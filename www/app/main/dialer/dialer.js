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
})


.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html'
  };
});
