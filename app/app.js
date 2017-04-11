sithLeague.config(function($mdThemingProvider, $routeProvider) {
  
  // Set Material theme options
  $mdThemingProvider.theme('default')
  .primaryPalette('indigo')
  .accentPalette('green')
  .warnPalette('red')
  .backgroundPalette('grey');

  // configure app routing
  $routeProvider

    // Homepage Route
    .when('/', {
        templateUrl : 'home/home.html',
        controller : 'AppController'
    });
});
