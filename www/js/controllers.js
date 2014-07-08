angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, Call) {
  $scope.numbers = {};
  $scope.numbers.dst = null;
  $scope.numbers.src = null || "14155345337";
  $scope.addInput = function(val){
    console.log('adding input');
    $scope.numbers.dst = !$scope.numbers.dst ? val.toString() : $scope.numbers.dst + val.toString();
  };
  $scope.removeInput = function(){
    console.log('removing input');
    $scope.numbers.dst = $scope.numbers.dst.slice(0, $scope.numbers.dst.length-1);
  };
  $scope.makeCall = function() {
  console.log('dialing a number');
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