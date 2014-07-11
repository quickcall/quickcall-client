angular.module('app.services', [
])
.factory('DialerFactory', function ($http, $ionicPopup) {
  var call = function(number) {
    console.log(number);


     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
  

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