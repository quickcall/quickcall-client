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
.controller('ContactsCtrl', function($scope, $ionicModal){
  console.log('Contacts CTRl linked!');
  $scope.index;
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
      name: "DH From Korea",
      imgPath: "dhLee.jpeg",
      description: "QuickCall founder, DH From Korea, DH From Korea, DH From Korea",
      phoneNumber: "123-123-1234"
    }
  ];
    // Create and load the Modal
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
});
