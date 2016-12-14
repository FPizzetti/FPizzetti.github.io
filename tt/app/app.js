(function() {

    var app = angular.module('appTimeTracker', ['ngRoute', 'firebase', 'chart.js']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);
        // We could use the html5mode to avoid the /#/ in the URL, but it would require some server-configuration.
        // See more:
        // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode

        $routeProvider
            .when('/', {
                controller: 'LogsController',
                templateUrl: 'app/views/logs.html'
            })
            .when('/projects', {
                controller: 'ProjectsController',
                templateUrl: 'app/views/projects.html'
            })        
            .when('/projects/:projectId', {
                controller: 'CourseViewController',
                templateUrl: 'app/views/projectItem.html'
            })
            .when('/statistics', {
                controller: 'StatisticsController',
                templateUrl: 'app/views/statistics.html'
            })
            .when('/statistics/:projectId', {
                controller: 'StatisticsController',
                templateUrl: 'app/views/statistics.html'
            })        
            .otherwise({ redirectTo: '/' });
        
    }]);

}());