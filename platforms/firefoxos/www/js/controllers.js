angular.module('starter.controllers', ['ionic'])
    .controller('DialCtrl', function($scope, $ionicLoading, Call) {
        $scope.numbers = {};
        $scope.numbers.dst = null;
        $scope.numbers.src = null || "14157588395";
        $scope.feelingLucky = false;
        $scope.addInput = function(val) {
            console.log('adding input');
            $scope.numbers.dst = !$scope.numbers.dst ? val.toString() : $scope.numbers.dst + val.toString();
        };
        $scope.removeInput = function() {
            console.log('removing input');
            $scope.numbers.dst = $scope.numbers.dst.slice(0, $scope.numbers.dst.length - 1);
        };
        $scope.show = function() {
            var message = '<p>Calling ' + $scope.numbers.dst + '\nthe app will call both you and your friend, so get ready.</p>'
            $ionicLoading.show({
                template: "<i class='icon ion-loading-a'></i>"+ message
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide();
        };
        $scope.makeCall = function() {
            console.log('dialing a number');
            if (arguments.length > 0) {
                // feeling lucky initiated
                var baseNum = "1415";
                var randDigits = function() {
                    //generated 7 digits code
                    return (Math.floor(Math.random() * 9000000) + 1000000);
                };
                $scope.numbers.dst = baseNum + randDigits();
            }
            $scope.show()
            Call.makeCall($scope.numbers)
                .then(function(result) {
                    $scope.hide();
                    $scope.numbers.dst = null;
                    console.log(result, 'youg call has been just fired');
                })
                .catch(function(err) {
                    if (err) {
                        console.log('there is an error with the click-to-call featurea')
                        throw err;
                    }
                });
        };
    })

.controller('ContactsCtrl', function($scope, Friends) {
    // fix later (mozilla's native device contacts API)
    // $scope.friends = function() {
    //     var filter = {
    //         // sortBy: givenName,
    //         // sortOrder: ascending
    //     }
    //     var result = Friends.getAllContacts(filter);
    //     result.onsuccess = function() {
    //         console.log(this.result.length + ' contacts found.');
    //     }
    //     result.onerror = function() {
    //         console.log('Something goes wrong!');
    //     }
    // };
    // //initialize
    // $scope.friends();
    $scope.friends = Friends.all();
})

.controller('ContactDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('SettingCtrl', function($scope, Setting) {
    $scope.toggleRecord = function() {
        console.log('we just enabled recording');
        Setting.enableRecord($scope.enableRecord);
    };
    $scope.toggleSms = function() {
        console.log('we just enabled sms');
        Setting.enableSms($scope.enableSms);
    };
});