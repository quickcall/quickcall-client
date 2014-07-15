//depencies needed for nav views
angular.module('app', [
  'ionic',
  'app.main',
  'app.services'
])
.run(function($ionicPlatform) {
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
      templateUrl: 'index.html'
    });
    //redirect to login in page
    $urlRouterProvider.otherwise('app/main/login');
});/* Front-end by:

@@@@@@@@@@    @@@@@@    @@@@@@    @@@@@@   @@@  @@@  
@@@@@@@@@@@  @@@@@@@@  @@@@@@@   @@@@@@@@  @@@@ @@@  
@@! @@! @@!  @@!  @@@  !@@       @@!  @@@  @@!@!@@@  
!@! !@! !@!  !@!  @!@  !@!       !@!  @!@  !@!!@!@!  
@!! !!@ @!@  @!@!@!@!  !!@@!!    @!@  !@!  @!@ !!@!  
!@!   ! !@!  !!!@!!!!   !!@!!!   !@!  !!!  !@!  !!!  
!!:     !!:  !!:  !!!       !:!  !!:  !!!  !!:  !!!  
:!:     :!:  :!:  !:!      !:!   :!:  !:!  :!:  !:!  
:::     ::   ::   :::  :::: ::   ::::: ::   ::   ::  
 :      :     :   : :  :: : :     : :  :   ::    :  

 and

@@@  @@@     @@@      @@@@@@   
@@@  @@@     @@@     @@@@@@@@  
@@!  !@@     @@!     @@!  @@@  
!@!  @!!     !@!     !@!  @!@  
@!@@!@!      !!@     @!@!@!@!  
!!@!!!       !!!     !!!@!!!!  
!!: :!!      !!:     !!:  !!!  
:!:  !:!     :!:     :!:  !:!  
 ::  :::      ::     ::   :::  
 :   :::     :        :   : :  
                                                       
*/