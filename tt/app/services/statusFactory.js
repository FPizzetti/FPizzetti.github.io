(function() {
    var statusFactory = function ($firebase, appSettings) {
        var factory = [];

        factory.getStatus = function () {
            var ref = new Firebase(appSettings.firebaseUrl + '/status');
            var sync = $firebase(ref);
            var statusObject = sync.$asObject();
            return statusObject;
        };
        
        factory.setStatus = function (params) {
            var ref = new Firebase(appSettings.firebaseUrl + '/status');
            var sync = $firebase(ref);
            sync.$set(params);
        };

        return factory;
    };


    statusFactory.$inject = ['$firebase', 'appSettings'];

    angular.module('appTimeTracker').factory('statusFactory', statusFactory);

}());