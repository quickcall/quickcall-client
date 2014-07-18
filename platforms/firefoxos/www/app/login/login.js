angular.module('app.login', [
])
//currently Login is set up as a substate of app.main, will eventually make it its own state.
.config(function($stateProvider){
  $stateProvider
    .state('app.login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    });
})

.controller('LoginCtrl', function($scope, DialerFactory, $state, $window, $http, $ionicPopup){
  $scope.userInput = DialerFactory.userInput;
  var user = $scope.userInput
  $scope.submit = function(){
    var phoneNumber = user.number.split("-").join(""); 
    $http({
      method: 'GET', 
      url: 'http://quickcall-server.herokuapp.com/account',
      params:{
        authId:user.ID,
        authToken:user.token
      }
    })
    .then(function(data) {
      var dataObj = data.data;
      var tokens = parseInt(dataObj.cash_credits);
      if(data.data.auth_id === user.ID && tokens > 1 && phoneNumber >= 11){
        $window.localStorage.setItem('com.quickCall.auth',
          JSON.stringify({
            id:data.auth_id,
            token:user.token,
            number:user.number,
            name: dataObj.name,
            cash_credits: dataObj.cash_credits,
            city: dataObj.city || "Unknown"
          })
        )
      }
      $state.go('app.main.dialer')
    })
    .catch(function(err){
      console.error(err)
      $ionicPopup.alert({
        title: 'Invalid Plivo credentials',
        content: 'Sorry it seems that either your Plivo credentials or phonenumber were entered incorrectly. Your phonenumber must but put in 11 digit format(1-555-555-5555)'
      })
    })
  };  
});
