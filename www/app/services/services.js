angular.module('app.services', [
])
.factory('DialerFactory', function ($http, $ionicPopup) {
  var call = function(destinationNumber) {

    var sourceNumber = '16508888614';

    var serverData = {
      dst: destinationNumber,
      src: sourceNumber
    };

    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: 'Number: ' + destinationNumber
    });

    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(serverData)
    }).then(function(err, data) {
      return data.results;
    });
  };

  return {
    call: call
  };
});