angular.module('app.main', [
  'app.main.settings',
  'app.main.dialer',
  'app.main.contacts' 
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main', {
      url: '/main',
      templateUrl: "app/main/main.html"
    });
});
