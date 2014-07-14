angular.module('app.main.dialer', [
  'ngCordova'
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
.controller('DialerCtrl', function($scope, DialerFactory, $ionicModal, $cordovaContacts){
  // $scope.contacts = [];
  // $scope.getContacts = function() {
  //   $cordovaContacts.find({})
  //     .then(function(result) {
  //       for (var i = 0; i < result.length; i++) {
  //         if(result[i].phoneNumbers) {
  //           $scope.contacts.push(result[i]);
  //         }
  //       };
  //   });
  //   console.log($scope.contacts);
  // };
  $scope.show = false;

  // $scope.showDialer = function() {
  //   if($scope.show === false) {
  //     $scope.show = true;
  //   }
  // };

  $scope.phoneNumber = '';

  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
    console.log($scope.phoneNumber)
  };
  $scope.makeCall = function() {
    DialerFactory.call($scope.phoneNumber);
    $scope.phoneNumber = '';
  };
  $scope.removeInput = function(){
    $scope.phoneNumber = $scope.phoneNumber.slice(0,-1);
  };


  //modal stuff
  $ionicModal.fromTemplateUrl('app/main/dialer/dialer-directive.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
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

.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html',
    replace: true,
    scope: true
  };
});