angular.module('sithLeague').config(config);

function config($routeProvider) {
  // configure app routing
  $routeProvider

    // Homepage Route
    .when('/', {
        templateUrl : './home/home.html',
        controller : 'AppController'
    });
};
