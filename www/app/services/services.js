angular.module('app.services', [
])
.factory('DialerFactory', function ($http) {
  var call = function(number) {
    console.log(number);
    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(number)
    }).then(function(err, data) {
      return data.results;
    });
  };

  return {
    call: call
  };
});