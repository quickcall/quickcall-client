(function(){
  var cache;

  angular.module('app.services', [
  'ngCordova'
])
//DialerFactory: Used to track the current user, recent numbers, and to make calls
.factory('DialerFactory', function ($http, $ionicPopup) {

  //variable that keeps the 3 most recent numbers
  var recentNumbers = [];

  //currentUser object, has a username and number property
  var currentUser = {};
  currentUser.username;
  currentUser.number;

  //call function, sends post request to server
  var call = function(destinationNumber) {
    //saves the called number to recentNumbers, keeps recentNumbers to 3 numbers max
    recentNumbers.unshift(destinationNumber);
    if(recentNumbers.length > 3){
      recentNumbers.pop();
    }
    //Get user object out of local storage
    var userData = JSON.parse(window.localStorage['com.quickCall.auth'])
    //The server expects an object with a dst, the number user is calling, and src, user's numbe
    var serverData = {
      dst: destinationNumber,
      src: userData.number,
      authId:userData.id,
      authToken:userData.token
    };

    /*This is a sloppy way to make the number in the alert pop-up look nice,
    courtesy of Kia   ┐('～`;)┌  Not currently in use*/
    var formatNumber = function(number){
      var arr = number.split('');
      arr.splice(0,1);
      return '(' +
        arr.splice(0,3).join('') + ") " +
        arr.splice(0,3).join('') + "-" +
        arr.splice(0,4).join('');
    };

    //This popup show's up in the screen when a call is initiated
    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: destinationNumber
    });

    //The actual server post request
    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(serverData)
    });
  };

  //The DialerFactory returns, usable in other controllers when DialerFactory is injected
  return {
    call: call,
    recentNumbers : recentNumbers,
    currentUser: currentUser
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
              photos: contact.photos
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