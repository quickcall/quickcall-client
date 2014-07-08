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
        // access to the mozilla's native device APi
        // it doesn't seem to work now
        // let's come back later to fix this
        // var getAllContacts = window.navigator.mozContacts.getAll;
        // return {
        //     getAllContacts: getAllContacts
        // }

        // some dummy contacts data
        var friends = [{
            id: 0,
            imgPath: 'alexPhillip.jpeg',
            name: 'Phillip Alexander'
        }, {
            id: 1,
            imgPath: 'spaceCat.jpg',
            name: 'Space Cat'
        }, {
            id: 2,
            imgPath: 'obama.jpeg',
            name: 'Obama the President'
        }, {
            id: 3,
            imgPath: 'dhLee.jpeg',
            name: 'DH from Korea'
        },
        {
            id: 4,
            imgPath: 'quickcall_logo_blue.png',
            name: 'quick call'
        }
        ];
        return {
            all: function() {
                return friends;
            },
            get: function(friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        };
    })
    .factory('Setting', function($rootScope) {
        $rootScope.recordEnabled = false;
        $rootScope.smsEnabled = false;
        var enableRecord = function(update) {
            console.log('now globally enabled -rec');
            $rootScope.recordEnabled = update || false;
        };
        var enableSms = function(update) {
            console.log('now globally enabled - sms');
            $rootScope.smsEnabled = update || false;
        };
        return {
            enableRecord: enableRecord,
            enableSms: enableSms
        };
    });