angular.module('app.services', [
  'ngCordova'
])
.factory('DialerFactory', function ($http, $ionicPopup) {
  var recentNumbers = [];
  var currentUser = {};

  var call = function(destinationNumber) {
    recentNumbers.push(destinationNumber);

    if(recentNumbers.length > 3){
      recentNumbers.shift();
    }

    console.log(recentNumbers);

    var serverData = {
      dst: destinationNumber,
      src: currentUser.number
    };

    var formatNumber = function(number){
      var arr = number.split('');
      arr.splice(0,1);
      return '(' +
        arr.splice(0,3).join('') + ") " +
        arr.splice(0,3).join('') + "-" +
        arr.splice(0,4).join('');
    };

    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: formatNumber(destinationNumber)
    });

    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(serverData)
    });
  };

  return {
    call: call,
    recentNumbers : recentNumbers,
    currentUser: currentUser
  };
})
.factory('ContactsFactory', function($cordovaContacts){
  var cache;

  var phoneContacts = function(){
    var options = {};
    if(cache) {
      return cache;
    } else {
      return $cordovaContacts.find(options)
        .then(function(results) {
          return cache = _(results).filter(function(result) {
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
      });
    }
  };

  var dummyContacts = [
    {
      name: "DH Lee",
      photos: [{value: "img/dhLee.jpeg"}],
      description: "HR14 Fullstack Software Engineer, QuickCall Founder",
      phoneNumbers: [{value: "14155345337"}]
    },
    {
      name: "Kia Fathi",
      photos: [{value: "img/kiaFathi.jpg"}],
      description: "HR14 Fullstack Software Engineer",
      phoneNumber: [{value:"16508888614"}]
    },
    {
      name: "Jakob Harclerode",
      photos: [{value: "img/yahkob.jpg"}],
      description: "HR14 Fullstack Software Engineer, Heavy Metal",
      phoneNumber: [{value:"19286996726"}]
    },
    {
      name: "Mason Hargrove",
      photos: [{value: "img/mase87.jpg"}],
      description: "HR14 Fullstack Software Engineer, Straight-Up Badass",
      phoneNumber: [{value:"12294128411"}]
    }
  ];
  return {
    contacts: phoneContacts,
    dummyContacts: dummyContacts
  };
});