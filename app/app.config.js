angular.module('sithLeague').config(config);

function config($mdThemingProvider) {
  
  // Set Material theme options
  $mdThemingProvider.theme('default')
  .primaryPalette('indigo')
  .accentPalette('green')
  .warnPalette('red')
  .backgroundPalette('grey');

};

