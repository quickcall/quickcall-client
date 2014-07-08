angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Call) {
  $scope.numbers = {};
  $scope.makeCall = function() {
    Call.makeCall($scope.numbers)
      .then(function(result) {
        console.log(result, 'result');
      })
      .
    catch (function(err) {
      if (err) {
        console.log('there is an error with the click-to-call featurea')
        throw err;
      }
    });
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {});