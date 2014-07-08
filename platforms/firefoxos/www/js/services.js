angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Call', function($http) {
        var makeCall = function(numbers) {
            console.log('numbers', numbers);
            return $http({
                    method: 'POST',
                    url: 'http://simple-dialer.herokuapp.com/call',
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

    
        var getAllContacts = window.navigator.mozContacts.getAll;

        return {
            getAllContacts: getAllContacts
        }
    });