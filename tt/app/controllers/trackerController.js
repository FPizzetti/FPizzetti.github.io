(function () {

    var TrackerController = function ($scope, logsFactory, statusFactory, projectsFactory, $interval) {
        $scope.loaded = false;
        $scope.counter = null;
        $scope.status = null;
        $scope.projectsRaw = null;
        $scope.projectsConverted = null;
        var _intervalId;

        function init() {
            $scope.counter = "00:00:00";

            $scope.projectsRaw = projectsFactory.getProjects();
            $scope.projectsRaw.$watch(function () {
                $scope.projectsConverted = [];
                for (var i = 0, len = $scope.projectsRaw.length; i < len; i++) {
                    var _id = $scope.projectsRaw[i].$id;
                    var _name = $scope.projectsRaw[i].name;
                    $scope.projectsConverted.push({
                        id: _id,
                        name: _name
                    });
                };
            });

            $scope.status = statusFactory.getStatus();
            $scope.status.$watch(function () {
                if ($scope.status.active) {
                    _intervalId = $interval(updateTime, 1000);
                } else {
                    stopTime();
                }
            });

            $scope.status.$loaded(function () {
                $scope.loaded = true;
            });
        }

        function updateTime() {
            var seconds = moment().diff(moment($scope.status.dateStart, 'x'), 'seconds');
            var elapsed = moment().startOf('day').seconds(seconds).format('HH:mm:ss');
            $scope.counter = elapsed;
        }
        
        function stopTime() {
            $interval.cancel(_intervalId);
            $scope.counter = "00:00:00";
        }

        $scope.startTracker = function () {
            if (!!$scope.status.activeProjectId) {
                $scope.status.active = true;
                $scope.status.dateStart = moment().format('x');
                $scope.status.$save();
            }
        };

        $scope.stopTracker = function () {
            stopTime();
            
            $scope.status.active = false;
            if (!!$scope.status.dateStart) {
                var seconds = moment().diff(moment($scope.status.dateStart, 'x'), 'seconds');
                if (seconds > 0) {
                    logsFactory.addLog($scope.status.activeProjectId, $scope.status.dateStart, seconds, $scope.status.notes);
                }
            }
            $scope.status.$save();
        };

        init();
    };

    TrackerController.$inject = ['$scope', 'logsFactory', 'statusFactory', 'projectsFactory', '$interval'];

    angular.module('appTimeTracker').controller('TrackerController', TrackerController);

}());