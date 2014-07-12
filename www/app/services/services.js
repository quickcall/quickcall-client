angular.module('app.services', [
])
.factory('DialerFactory', function ($http, $ionicPopup) {
  var call = function(destinationNumber) {

    var sourceNumber = '16508888614';

    var serverData = {
      dst: destinationNumber,
      src: sourceNumber
    };

    var formatNumber = function(number){
      var arr = number.split('');
      arr.splice(0,1);
      return '(' + 
        arr.splice(0,3).join('') + ") " + 
        arr.splice(0,3).join('') + "-" + 
        arr.splice(0,4).join('');
    };


    var alertPopup = $ionicPopup.alert({
      title: 'Calling...',
      template: formatNumber(destinationNumber)
    });

    return $http({
      method: 'POST',
      url: 'http://simple-dialer.herokuapp.com/call',
      data: JSON.stringify(serverData)
    });
  };

  return {
    call: call
  };
});