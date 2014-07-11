angular.module('app.main.contacts', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.contacts', {
      url: '/contacts',
      views: {
        'contacts': {
          templateUrl : "app/main/contacts/contacts.html",
          controller : "ContactsCtrl"
        }
      }
    });
})
.controller('ContactsCtrl', function($scope, $ionicModal, DialerFactory){
  console.log('Contacts CTRl linked!');
  $scope.index = 0;
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
    }
  ];

  //to call number when they are called
  //will switch over to dialer view and invoke call
  $scope.makeCall = function(target){
    //index is the active user
    target = target || $scope.friends[$scope.index];
    return DialerFactory.call(target.phoneNumber);

  };

  $ionicModal.fromTemplateUrl('app/main/contacts/contactInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(target) {
    $scope.index = target;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.directive('contact', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/main/contacts/contacts-directive.html'
  };
});




