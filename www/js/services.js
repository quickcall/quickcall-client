angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Call', function($http) {
  var makeCall = function(numbers) {
    console.log('numbers', numbers);
    return $http({
      method: 'POST',
      url: 'http://dialer.ngrok.com/call',
      data: JSON.stringify(numbers),
      dataType: "json"
      })
      .then(function(resp) {
        return resp.data;
      });
  };
  return {
    makeCall: makeCall
  };
})
  .factory('Friends', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [{
      id: 0,
      name: 'Scruff McGruff'
    }, {
      id: 1,
      name: 'G.I. Joe'
    }, {
      id: 2,
      name: 'Miss Frizzle'
    }, {
      id: 3,
      name: 'Ash Ketchum'
    }];

    return {
      all: function() {
        return friends;
      },
      get: function(friendId) {
        // Simple index lookup
        return friends[friendId];
      }
    }
  });