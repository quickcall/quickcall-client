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
.controller('ContactsCtrl', function($scope, $ionicModal, DialerFactory, ContactsFactory){
  $scope.index = 0;
  $scope.friends;

  ContactsFactory.contacts().then(function(results) {
    $scope.friends = results;
    console.log(results);
  });
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




