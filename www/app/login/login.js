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
  //forms input on login.html
  $scope.userInput = DialerFactory.userInput;
  var user = $scope.userInput
  //on html form submit function
  $scope.submit = function(){
    //remove dashes from number
    var phoneNumber = user.number.split("-").join(""); 
    //verifying users plivo credentials
    $http({
      method: 'GET', 
      url: 'http://quickcall-server.herokuapp.com/account',
      /*sending authID and authToken to verify with plivo if successful plivo will send us a user
      JSON object if credentials are invalid we will be sent an error message from plivo*/
      params:{
        authId:user.ID,
        authToken:user.token
      }
    })
    //on successful get request
    .then(function(data) {
      //targeting correct property of object
      var dataObj = data.data;
      //parsing tokens for comparison
      var tokens = parseInt(dataObj.cash_credits);
      /*checking if form input authID matches returned authId that user has at least $1.00 and that their 
      phone number is in valid format (11 digit, i.e. 1-555-555-5555) */
      if(data.data.auth_id === user.ID && tokens > 1 && phoneNumber >= 11){
        //set data to local storage
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
      //go to default page if successful
      $state.go('app.main.dialer')
    })
    .catch(function(err){
      console.error(err)
      //error handling, will send a pop up message that tells customer how to correctly input their credentials
      $ionicPopup.alert({
        title: 'Invalid Plivo credentials',
        content: 'Sorry it seems that either your Plivo credentials or phonenumber were entered incorrectly. Your phonenumber must but put in 11 digit format(1-555-555-5555)'
      })
    })
  };  
});
