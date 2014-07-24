(function(){
  var cache;

  angular.module('app.services', [
  'ngCordova'
])
//DialerFactory: Used to track the current user, recent numbers, and to make calls
.factory('DialerFactory', function ($http, $ionicPopup, $window, $rootScope) {

  //variable that keeps the 3 most recent numbers
  var recentNumbers = [];
  //current users data from local storage
  var currentUser = {};


  //call function, sends post request to server
  var call = function(destinationNumber) {
    //saves the called number to recentNumbers, keeps recentNumbers to 3 numbers max
    recentNumbers.unshift(destinationNumber);
    if(recentNumbers.length > 3){
      recentNumbers.pop();
    }
    //Get user object out of local storage
    var userData = JSON.parse($window.localStorage['com.quickCall.auth']);
    //The server expects an object with a dst, the number user is calling, and src, user's numbe
    var serverData = {
      dst: destinationNumber,
      src: userData.number,
      plivoNumber: userData.plivoNumber,
      authId: userData.id,
      authToken:userData.token
    };

    /*This is a sloppy way to make the number in the alert pop-up look nice,
    courtesy of Kia   ┐('～`;)┌  Not currently in use*/
    var formatNumber = function(number){
      if(number.length === 11){
        var arr = number.split('');
        arr.splice(0,1);
        return '(' +
          arr.splice(0,3).join('') + ") " +
          arr.splice(0,3).join('') + "-" +
          arr.splice(0,4).join('');
      } else if (number.length ===10 ) {
        var arr = number.split('');
        return '(' +
          arr.splice(0,3).join('') + ") " +
          arr.splice(0,3).join('') + "-" +
          arr.splice(0,4).join('');
      }
      else {
        return number;
      }
    };

    //This popup show's up in the screen when a call is initiated
    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: formatNumber(destinationNumber) + "<br>You will receive a call shortly to connect you"
    });

    //The actual server post request
    return $http({
      method: 'POST',
      url: 'http://quickcall-server-plus.herokuapp.com/call',
      data: JSON.stringify(serverData)
    });
  };

  $rootScope.data = {};
  var sms = function(destinationNumber){
    //saves the called number to recentNumbers, keeps recentNumbers to 3 numbers max
    recentNumbers.unshift(destinationNumber);
    if(recentNumbers.length > 3){
      recentNumbers.pop();
    }
    //Get user object out of local storage
    var userData = JSON.parse($window.localStorage['com.quickCall.auth']);

    var popup = $ionicPopup.show({
      title: 'Enter your text message',
      template: '<textArea type="text" ng-model="data.message" rows="6">',
      scope: $rootScope,
      buttons: [
        {
          text: '<span class="popupButtonText">Cancel</span>',
        },
        {
          text: '<span class="popupButtonText">Send</span>',
          type: 'button-positive',
          onTap: function(e){
            if(!$rootScope.data.message){
              e.preventDefault();
            }else{
              return $rootScope.data.message;
              $rootScope.data.message = '';
            }
          }
        }
      ]
    });
    
    popup.then(function(message){
      //Set up a payload of data with source/destination phone numbers, authorization tokens, and a message
      var serverData = {
        dst: destinationNumber,
        src: userData.number,
        plivoNumber: userData.plivoNumber,
        text: message,
        authId: userData.id,
        authToken:userData.token
      };

      //The actual server post request
      return $http({
        method: 'POST',
        url: 'http://quickcall-server-plus.herokuapp.com/sms',
        data: JSON.stringify(serverData)
      });
    });
  };



  //The DialerFactory returns, usable in other controllers when DialerFactory is injected
  return {
    call: call,
    sms: sms,
    recentNumbers : recentNumbers,
    currentUser: currentUser
  };

})

.factory('LoginFactory', function($firebaseSimpleLogin, $rootScope, $state) {
    // <<- create firebase objects required to simple log
    var ref = new Firebase('https://quickcallhr.firebaseio.com');
    var auth = $firebaseSimpleLogin(ref); 

    // <<- register new users
    var register = function(userPayload) {
      auth.$createUser(userPayload.email, userPayload.password)
        .then(function(user) {
          $state.go('app.main.dialer');
        })
        .catch(function(err) {
          console.log(err);
        });
      // <<- send userInput.phoneNumber to database on register and redirect to home page
      // $state.go('app.main.dialer'); 
    };

    // <<- authenticate users 
    var login = function(userPayload) {
      return auth.$login('password', userPayload)
        .then(function(user) {
          if (user) {
            $state.go('app.main.dialer');
          } else {
            $state.go('app.login');
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }; 

    // <<- check to see if a user is signed in
    var signin = function() {
      return auth.$getUser()
        .then(function(user) {
          if (user) {
            return; 
          } else {
            $state.go('app.login'); 
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }; 

    // <<- sign user out
    var logout = function() {
      return auth.$logout()
        .then(function() {
          $state.go('app.login');
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    return {
      register: register, 
      login: login, 
      signin: signin,
      logout: logout
    }; 
})

// .factory('LoginFactory', function ($http, $state, $ionicPopup, $window){
//   //used for databinding on login.html
//   var userInput = {};

//   //on html form submit function
//   var submit = function(user){
//     //remove dashes from number with regex
//     var phoneNumber = user.number.replace(/\D+/g,'');
//     //verifying users plivo credentials
//     $http({
//       method: 'GET',
//       url: 'http://quickcall-server-plus.herokuapp.com/account',
//       /*sending authID and authToken to verify with plivo if successful plivo will send us a user
//       JSON object if credentials are invalid we will be sent an error message from plivo*/
//       params:{
//         authId:user.ID,
//         authToken:user.token
//       }
//     })
//     //on successful get request
//     .then(function(data) {
//       //targeting correct property of object
//       var dataObj = data.data;
//       //parsing tokens for comparison
//       var tokens = parseInt(dataObj.cash_credits);
//       //checking if form input authID matches returned authId that user has at least $1.00
//       if(dataObj.auth_id === user.ID && tokens > 1){
//         //verify Phonenumber is correct format
//         if(phoneNumber.length < 11){
//           $ionicPopup.alert({
//             title: 'Invalid Phone Number',
//             content: "Sorry but '" + user.number + "' is not a valid phone number make sure to include a country code and area code. <br>(ex: 1-555-555-5555)"
//           })
//           //if number is use return statement to prevent from adding to local storage
//           return;
//         }
//         //set data to local storage
//         $window.localStorage.setItem('com.quickCall.auth',
//           JSON.stringify({
//             id: dataObj.auth_id,
//             token:user.token,
//             number:phoneNumber,
//             name: dataObj.name,
//             cash_credits: dataObj.cash_credits,
//             city: dataObj.city || "Unknown",
//             plivoNumber: dataObj.plivoNumber
//           })
//         );
//       }
//       //go to default page if successful
//       $state.go('app.main.dialer');
//     })
//     .catch(function(err){
//       console.error(err);
//       //error handling, will send a pop up message that tells customer how to correctly input their credentials
//       $ionicPopup.alert({
//         title: 'Invalid Plivo credentials',
//         content: 'Sorry it seems that either your Plivo Auth Token and ID were entered incorrectly or are invalid, please check your credentials and try again.'
//       });
//     });
//   };

//   return{
//     userInput: userInput,
//     submit: submit
//   };
// })


//The ContactsFactory, used to get, store, and share between views
.factory('ContactsFactory', function($cordovaContacts, $q){
  //cache, so you don't have to pull the phones contacts multiple times if they are already there

  //used on phone to get phone's native contacts. Cordova expects them to have the below properties
  var phoneContacts = function(){
    var defer = $q.defer();
    var options = {};
    if(cache) {
      defer.resolve(cache);
    } else {
      //$cordovaContacts returns promise
      $cordovaContacts.find(options)
        .then(function(results) {
          cache = _(results).filter(function(result) {
            return result.displayName;
          })
          .reduce(function(result, contact) {
            var user = {
              name: contact.displayName,
              phoneNumbers: contact.phoneNumbers,
              photos: [{value: 'ion-ios7-person'}]
            };
            result.push(user);
            return result;
          }, []);
          defer.resolve(cache);
      });
    }
    return defer.promise;
  };

  /*dummyContacts used for local testing, cordova doesn't work unless on actual phone
  so you can use this instead for testing purposes*/
  var dummyContacts = [
    { name: "Imtiaz Majeed",
      phoneNumbers: [{value: "14074370298"}]
    },
    { name: "Austen Talbot",
      phoneNumbers: [{value: "17177990164"}]
    },    
    {
      name: "Forest Toney",
      phoneNumbers: [{value: "13107229969"}]
    },
    {
      name: "Adam Price",
      phoneNumbers: [{value: "17327257505"}]
    },
    {
      name: "DH Lee",
      photos: [{value: "img/dhLee.jpeg"}],
      description: "HR14 Fullstack Software Engineer, QuickCall Founder",
      phoneNumbers: [{value: "14155345337"}]
    },
    {
      //just an incredibly sexy dude (^_^)
      name: "Kia Fathi",
      photos: [{value: "img/kiaFathi.jpg"}],
      description: "HR14 Fullstack Software Engineer",
      phoneNumbers: [{value:"16508888614"}]
    },
    {
      name: "Jakob Harclerode",
      photos: [{value: "img/yahkob.jpg"}],
      description: "HR14 Fullstack Software Engineer, Heavy Metal",
      phoneNumbers: [{value:"19286996726"}]
    },
    {
      name: "Mason Hargrove",
      photos: [{value: "img/mase87.jpg"}],
      description: "HR14 Fullstack Software Engineer, Straight-Up Badass",
      phoneNumbers: [{value:"12294128411"}]
    }
  ];
  //returns of the ContactsFactory, usable wherever ContactsFactory is injected
  return {
    contacts: phoneContacts,
    dummyContacts: dummyContacts
  };
});
}());