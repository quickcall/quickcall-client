//depencies needed for nav views
angular.module('app', [
  'ionic',
  'app.main',
  'app.services',
  'app.login'
])
//This run function determines if a user object is stored on login
//otherwise it will redirect to login, won't let you leave login until logged in
.run(function($ionicPlatform, $rootScope, $window, $urlRouter, $state) {
  $rootScope.$on('$locationChangeSuccess', function(event) {
    event.preventDefault();
    if($window.localStorage.getItem('com.quickCall.auth')) {
      $urlRouter.sync();
    } else {
      $state.go('app.login');
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/app.html'
    });
    //redirect to login in page
    $urlRouterProvider.otherwise('app/main/dialer');
});
