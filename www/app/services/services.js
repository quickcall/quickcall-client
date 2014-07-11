angular.module('app.services', [
])
.factory('DialerFactory', function ($http, $ionicPopup) {
  var call = function(destinationNumber) {

    var sourceNumber = '16508888614';

    var serverData = {
      dst: destinationNumber,
      src: sourceNumber
    };

    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: 'Number: ' + destinationNumber
    });

    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(serverData)
    });
  };

  return {
    call: call
  };
})
.factory('ContactsFactory', function() {
  return {
    friends: [
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
    ]
  };
});





