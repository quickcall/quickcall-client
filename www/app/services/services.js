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
    if(typeof cache === 'object') {
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
      name: "Alexander Phillip",
      imgPath: 'alexPhillip.jpeg',
      description: "AWESOME!",
      phoneNumber: "415-514-1234"
    },
    {
      name: "Barack The Rock Obama",
      imgPath: 'obama.jpeg',
      description: "Yo America, the beautiful",
      phoneNumber: "USA-USA-USASA"
    },
    {
      name: "DH Lee",
      imgPath: "dhLee.jpeg",
      description: "HR14 Fullstack Software Engineer, QuickCall Founder",
      phoneNumber: "14155345337"
    },
    {
      name: "Kia Fathi",
      imgPath: "kiaFathi.jpg",
      description: "HR14 Fullstack Software Engineer",
      phoneNumber: "16508888614"
    },
    {
      name: "Jakob Harclerode",
      imgPath: "yahkob.jpg",
      description: "HR14 Fullstack Software Engineer, Heavy Metal",
      phoneNumber: "19286996726"
    },
    {
      name: "Mason Hargrove",
      imgPath: "mase87.jpg",
      description: "HR14 Fullstack Software Engineer, Straight-Up Badass",
      phoneNumber: "12294128411"
    },
    {
      name: "SpaceCat",
      imgPath: "spaceCat.jpg",
      description: "RARGH MEOW RARG! PEW PEW LAZORS",
      phoneNumber: "YOU CAN NEVER GET THIS"
    }
  ];
  return {
    contacts: phoneContacts,
    dummyContacts: dummyContacts
  };
});