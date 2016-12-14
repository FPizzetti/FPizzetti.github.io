(function () {
    var projectsFactory = function ($firebase, appSettings) {
        var factory = [];

        factory.getProjects = function () {
            var ref = new Firebase(appSettings.firebaseUrl + '/projects');
            var sync = $firebase(ref);
            var list = sync.$asArray();
            return list;
        };
        
        factory.getProjectById = function(id) {
            var ref = new Firebase(appSettings.firebaseUrl + '/projects/' + id);
            var sync = $firebase(ref);
            var obj = sync.$asObject();
            return obj;
        };

        return factory;
    };

    projectsFactory.$inject = ['$firebase', 'appSettings'];

    angular.module('appTimeTracker').factory('projectsFactory', projectsFactory);

}());