(function () {

    var AppController = function ($scope, $location, appSettings) {
        $scope.appSettings = appSettings;
        
        $scope.navIsActive = function (path) {
            return path === $location.path();
        };
    };

    AppController.$inject = ['$scope', '$location', 'appSettings'];

    angular.module('appTimeTracker').controller('AppController', AppController);

}());