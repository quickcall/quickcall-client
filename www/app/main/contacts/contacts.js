angular.module('app.main.contacts', [
])
//state provider, sets it as a subview of app.main
.config(function($stateProvider){
  $stateProvider
    .state('app.main.contacts', {
      url: '/contacts',
      views: {
        //the tab-subview name
        'contacts': {
          templateUrl : "app/main/contacts/contacts.html",
          controller : "ContactsCtrl"
        }
      }
    });
})
.controller('ContactsCtrl', function($scope, $ionicModal, DialerFactory, ContactsFactory, $state){
  //this index is used as a target for populating the modal with the correct info
  $scope.index = 0;

  //links the scopes friends with the ContactsFactory for testing dummy data, disable for mobile
  $scope.friends = ContactsFactory.dummyContacts;

  //Sets the scopes currentUser to the username established at login
  $scope.currentUser = DialerFactory.currentUser.username;
  
  /*This is a redirect to app.main.login if there is no one logged in, don't want users to hop
  between views if they did not log in*/
  if(!$scope.currentUser){
    $state.go('app.main.login');
  }

  /*The below block of code is used on mobile devices to pull the native contacts instead of the
  dummy data.*/
  // ContactsFactory.contacts().then(function(results) {
  //   $scope.friends = results;
  // });
  //to call number when they are called
  //will switch over to dialer view and invoke call
 
  //function to make a call, uses the DialerFactory's call method.
  $scope.makeCall = function(target){
    //$scope.index is the active user, updated when you open a modal.
    target = target || $scope.friends[$scope.index];
    return DialerFactory.call(target.phoneNumbers[0].value);
  };

  /*This establishes the modal, contactInfo, and provides some basic modal functions to 
  manipulate it. The only functions used are openModal and closeModal, close is invoked fromt the 
  modal itself*/
  $ionicModal.fromTemplateUrl('app/main/contacts/contactInfo.html', {
    //passes the modal the same $scope as our current scope, lets you use index inside modal.
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(target) {
    /*this takes the item clicked and saves it as $scope.index. Essential to show correct data
    inside the modal.*/
    $scope.index = target;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it! Not actually in use right now :-).
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



