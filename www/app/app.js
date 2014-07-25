//depencies needed for nav views
angular.module('app', [
  'ionic',
  'firebase',
  'app.main',
  'app.services',
  'app.auth'
])

  .run(function($ionicPlatform, $rootScope, $window, $urlRouter, $state, LoginFactory) {
    // <<- authenticate users
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      LoginFactory.signin()
        .then(function(user) {
          if (toState.authenticate && !user) {
            $state.go('app.home'); 
            event.preventDefault();
          } 
        })
        .catch(function(err) {
          console.log(err);
        });
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
        templateUrl: 'app/app.html', 
        authenticate: true
      });
      //redirect to home
      $urlRouterProvider.otherwise('app/home');
  });
