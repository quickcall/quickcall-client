angular.module('app.main.dialer', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.dialer', {
      url: '/dialer',
      views: {
        'dialer': {
          templateUrl: 'app/main/dialer/dialer.html',
          controller: 'DialerCtrl'
        }
      }
    });
})
.controller('DialerCtrl', function($scope, DialerFactory){
  $scope.show = false;

  $scope.showDialer = function() {
    if($scope.show === false) {
      $scope.show = true;
    }
  };

  $scope.phoneNumber = '';

  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
  };
  $scope.makeCall = function() {
    DialerFactory.call($scope.phoneNumber);
    $scope.phoneNumber = '';
  };
  $scope.removeInput = function(){
    $scope.phoneNumber = $scope.phoneNumber.slice(0,-1);
  };

  $scope.friends = [
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
    },
    {
      name: "Alexander Phillip",
      imgPath: 'alexPhillip.jpeg',
      description: "AWESOME!",
      phoneNumber: "415-514-1234"
    },
    {
      name: "Alexander Phillip",
      imgPath: 'alexPhillip.jpeg',
      description: "AWESOME!",
      phoneNumber: "415-514-1234"
    },
    {
      name: "Alexander Phillip",
      imgPath: 'alexPhillip.jpeg',
      description: "AWESOME!",
      phoneNumber: "415-514-1234"
    }
  ];
})

.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html',
    replace: true,
    scope: true
  };
});
