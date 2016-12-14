(function () {

    var ProjectsController = function ($scope, projectsFactory, logsFactory) {
        $scope.loaded = false;
        $scope.projects = null;
        $scope.logs = null;

        function init() {
            $scope.projects = projectsFactory.getProjects();
            $scope.logs = logsFactory.getLogs();
            
            $scope.logs.$loaded().then(function (x) {
                $scope.loaded = x === $scope.logs;
            });
        }

        $scope.getTimeSpent = function (project) {
            var seconds = 0;
            for (var i = 0, len = $scope.logs.length; i < len; i++) {
                if ($scope.logs[i].projectId == project.$id) {
                    seconds += $scope.logs[i].seconds;
                }
            }
            var timeSpent = moment().startOf('day').seconds(seconds).format('HH:mm:ss');
            return timeSpent;
        };

        $scope.addProject = function (name) {
            $scope.projects.$add({
                name: name
            });
            $scope.newProjectName = null;
        };

        $scope.deleteProject = function (project) {
            var _id = project.$id;
            if ($scope.logs.length > 0) {
                for (var i = 0, len = $scope.logs.length; i < len; i++) {
                    if ($scope.logs[i].projectId == _id) {
                        $scope.logs.$remove($scope.logs[i]);
                    }
                }
            }
            $scope.projects.$remove(project);
        };

        init();
    };

    ProjectsController.$inject = ['$scope', 'projectsFactory', 'logsFactory'];

    angular.module('appTimeTracker').controller('ProjectsController', ProjectsController);

}());