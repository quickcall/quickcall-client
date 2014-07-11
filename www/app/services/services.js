angular.module('app.services', [
])
.factory('DialerFactory', function () {
  return {
    callNumber: function(number){
      console.log(number);
    }
  };
});