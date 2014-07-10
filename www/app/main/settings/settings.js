angular.module('app.main.settings', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.settings', {
      url: '/settings',
      views: {
        'app.main.settings': {
          templateUrl: 'app/main/settings/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    });
})
.controller('SettingsCtrl', function($scope){});