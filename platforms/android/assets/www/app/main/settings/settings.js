angular.module('app.main.settings', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.settings', {
      url: '/settings',
      views: {
        'settings': {
          templateUrl: 'app/main/settings/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    });
})
.controller('SettingsCtrl', function($scope, $ionicModal, DialerFactory){
  $scope.currentUser = DialerFactory.currentUser;
  $scope.check = false;


  $scope.openModal = function(target) {
    console.log($scope.currentUser)
    if($scope.currentUser.username === undefined) {
      $scope.modal.show();
    }
    $scope.index = target;
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

  ionic.Platform.ready(function(){
    $ionicModal.fromTemplateUrl('/app/main/settings/loginModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  });
});