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
    //remove dashes from number with regex
    var phoneNumber = user.number.replace(/\D+/g,'');
    console.log(phoneNumber)
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
      //checking if form input authID matches returned authId that user has at least $1.00 
      if(data.data.auth_id === user.ID && tokens > 1){
        //verify Phonenumber is correct format
        if(phoneNumber.length < 11){
          $ionicPopup.alert({
            title: 'Invalid Phone Number',
            content: "Sorry but '" + user.number + "' is not a valid phone number make sure to include a country code and area code. <br>(ex: 1-555-555-5555)"
          })
          //if number is use return statement to prevent from adding to local storage
          return;
        }
        //set data to local storage
        $window.localStorage.setItem('com.quickCall.auth',
          JSON.stringify({
            id:data.auth_id,
            token:user.token,
            number:phoneNumber,
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
        content: 'Sorry it seems that either your Plivo Auth Token and ID were entered incorrectly or are invalid, please check your credentials and try again.'
      })
    })
  };  
});
