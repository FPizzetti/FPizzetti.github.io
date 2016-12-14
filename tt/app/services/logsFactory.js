(function () {
    var logsFactory = function ($firebase, appSettings) {
        var factory = [];

        factory.getLogs = function () {
            var ref = new Firebase(appSettings.firebaseUrl + '/logs');
            var sync = $firebase(ref);
            var logsArray = sync.$asArray();
            return logsArray;
        };

        factory.addLog = function (projectId, dateStart, seconds, notes) {
            var ref = new Firebase(appSettings.firebaseUrl + '/logs');
            var sync = $firebase(ref);
            sync.$push({
                projectId: projectId,
                dateStart: dateStart,
                seconds: seconds,
                notes: notes
            }).then(function (ref) {
                //ref.key();
            }, function (error) {
                console.log('Error:', error);
            });
        };

        return factory;
    };


    logsFactory.$inject = ['$firebase', 'appSettings'];

    angular.module('appTimeTracker').factory('logsFactory', logsFactory);

}());