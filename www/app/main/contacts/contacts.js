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
  $scope.showModal = function(){
    console.log(this.modal);
    console.log(this);
  };
});
