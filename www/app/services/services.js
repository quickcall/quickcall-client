(function(){
  var cache;

  angular.module('app.services', [
  'ngCordova'
])
  //DialerFactory: Used to track the current user, recent numbers, and to make calls
  .factory('DialerFactory', function ($http, $ionicPopup, $window, $rootScope, $firebase, LoginFactory, UserFactory) {
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

      // <<- alias UserFactory.data.userData and append destinationNumber
      var callPayload = UserFactory.data.userData; 
      callPayload.dst = destinationNumber; 

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
    
      return $http({
        method: 'POST',
        url: 'https://quickcall-server.azurewebsites.net/call',
        data: JSON.stringify(callPayload)
      })
        .then(function(data) {
          console.log(data);
        }) 
        .catch(function(error) {
          console.log(err);
        });
    };

    $rootScope.data = {};
    var sms = function(destinationNumber){
      //saves the called number to recentNumbers, keeps recentNumbers to 3 numbers max
      recentNumbers.unshift(destinationNumber);
      if(recentNumbers.length > 3){
        recentNumbers.pop();
      }

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
                var message = $rootScope.data.message;
                $rootScope.data.message = '';
                return message;
              }
            }
          }
        ]
      });
      
      popup.then(function(message){

        if (message && message !== '') {
          // <<- alias UserFactory.data.userData and append dst and text
          var textPayload = UserFactory.data.userData;
          textPayload.dst = destinationNumber;
          textPayload.text = message; 

          //The actual server post request
          return $http({
            method: 'POST',
            url: 'https://quickcall-server.azurewebsites.net/sms',
            data: JSON.stringify(textPayload)
          });
        }
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

  .factory('LoginFactory', function($firebase, $firebaseSimpleLogin, $rootScope, $http, $state, UserFactory) {
    // <<- create firebase objects required for simple login and to store information to database
    var ref;
    var authref = new Firebase('https://quickcallhr.firebaseio.com');
    var auth = $firebaseSimpleLogin(authref); 

    // <<- register new users
    var register = function(userPayload) {
      // <<- remove dashes from phone number using regexp
      var phoneNumber = userPayload.phoneNumber.replace(/\D+/g,'');
      var firebaseUser;

      // <<- create a user profile via firebase
      auth.$createUser(userPayload.email, userPayload.password)
        .then(function(user) {
          // <<- save user to external variable
          firebaseUser = user;
          // <<- send user id to server to generate plivo subaccount 
          $http({
            method: 'POST',
            url: 'https://quickcall-server.azurewebsites.net/createUser',
            data:{
              id: firebaseUser.id
            }
          })
            .then(function(serverPayload) {
              // <<- create new firebase ref
              ref = $firebase(new Firebase('https://quickcallhr.firebaseio.com' + '/' + firebaseUser.id));
              // <<- add user id and server payload to database
              ref.$add({
                id: firebaseUser.id, 
                phoneNumber: phoneNumber,
                api_id: serverPayload.data.api_id,
                auth_id: serverPayload.data.auth_id, 
                auth_token: serverPayload.data.auth_token,
                plivo_phone: serverPayload.data.plivo_phone, 
                tokens: 0
              })
                .then(function() {
                  $state.go('app.login');
                })
                .catch(function(err) {
                  console.log(err);
                })
            })
            .catch(function(err) {
              console.log(err);
            })
        })
        .catch(function(err) {
          console.log(err);
        })
    };

    // <<- authenticate users 
    var login = function(userPayload) {
      auth.$login('password', userPayload)
        .then(function(user) {
          if (user) {
            UserFactory.data.getUserData; 
            $state.go('app.main.contacts');
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
      // <<- return promise to app.js
      return auth.$getCurrentUser()
    }; 

    // <<- sign user out
    var logout = function() {
      auth.$logout()
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

  // <<- stores user data from firebase
  .factory('UserFactory', function($firebase, $firebaseSimpleLogin) {
    var authref = new Firebase('https://quickcallhr.firebaseio.com');
    var auth = $firebaseSimpleLogin(authref);

    var data = {}; 

    data.ref;
    data.userData; 

    data.getUserData = auth.$getCurrentUser()
      .then(function(user) {
        data.ref = $firebase(new Firebase('https://quickcallhr.firebaseio.com' + '/' + user.id));
        data.ref.$on('value', function(userSnapshot) {
          var firebasePayload = userSnapshot.snapshot.value;
          // <<- firebase returns userdata in a nested object
          for (var key in firebasePayload) {
            if (firebasePayload.hasOwnProperty(key)) {
              // <<- set userData
              data.userData = firebasePayload[key];
            }
          }
        });
      })
      .catch(function(err) {
        console.log(err);
      });

    return {
      data: data
    };
  })

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
        phoneNumbers: [{value: "14155345337"}]
      },
      {
        //just an incredibly sexy dude (^_^)
        name: "Kia Fathi",
        photos: [{value: "img/kiaFathi.jpg"}],
        phoneNumbers: [{value:"16508888614"}]
      },
      {
        name: "Jakob Harclerode",
        photos: [{value: "img/yahkob.jpg"}],
        phoneNumbers: [{value:"19286996726"}]
      },
      {
        name: "Mason Hargrove",
        photos: [{value: "img/mase87.jpg"}],
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