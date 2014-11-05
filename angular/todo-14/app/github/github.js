var app = angular.module('myApp.github', ['$stateProvider', 'ngResource']);

app.config(['$stateProvider', function($stateProvider){
  // TODO
}]);

/*
app.controller('GithubListController', ['$scope', '$http', function($scope, $http) {
  $scope.projects = [];

  $http.get('https://api.github.com/orgs/angular/repos').then(function(data) {
    $scope.projects = data.data;
  });
}]);

app.controller('GithubDetailController', ['$scope', '$routeParams', '$resource', function($scope, $routeParams, $resource) {
  $scope.project = {};

  var project = $routeParams.project;
  var Project = $resource('https://api.github.com/repos/angular/:project', {project: '@project'});
  var ProjectPull = $resource('https://api.github.com/repos/angular/:project/pulls', {project: '@project'});
  $scope.project = Project.get({project: project});
  $scope.pulls = ProjectPull.query({project: project});
}]);
*/
