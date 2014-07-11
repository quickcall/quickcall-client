angular.module('app.services', [
])
.factory('DialerFactory', function ($http, $ionicPopup) {
  var call = function(number) {

    var serverData = {
      dst: number,
      src: '16508888614'
    };

    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: 'Number: ' + number
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