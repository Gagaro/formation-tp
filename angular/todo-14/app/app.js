'use strict';

var app = angular.module('myApp', ['gettext', 'myApp.todo']);

app.run(['gettextCatalog', function(gettextCatalog){
  gettextCatalog.setCurrentLanguage('FR');
  gettextCatalog.debug = true;
}]);
