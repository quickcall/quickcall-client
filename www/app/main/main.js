angular.module('app.main', [
  //All the essential modules are injected into our umbrella main module
  'app.main.settings',
  'app.main.dialer',
  'app.main.contacts'
])

  .config(function($stateProvider){
    $stateProvider
      .state('app.main', {
        url: '/main',
        abstract: true,
        templateUrl: "app/main/main.html"
      });
  });
