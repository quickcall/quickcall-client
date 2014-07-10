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
.controller('ContactsCtrl', function($scope){});
