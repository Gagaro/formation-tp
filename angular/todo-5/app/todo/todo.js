var app = angular.module('myApp.todo', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'todo/partials/list.html',
      controller: 'TodoListController',
    })
    .when('/todo/:id', {
      templateUrl: 'todo/partials/todo.html',
      controller: 'TodoController',
    })
    .otherwise({redirectTo: '/'});
});

app.controller('TodoListController', function($scope, $rootScope) {
    $scope.filterText = "";
    $scope.filterDone = {done: ""};

    if ($rootScope.todoList === undefined) {
      $rootScope.todoList = [
        {'id' : 1, 'date': Date.now(), 'title': 'Finir le TP 1', 'done': true},
        {'id' : 2, 'date': Date.now(), 'title': 'Finir le TP 2', 'done': false},
        {'id' : 3, 'date': Date.now(), 'title': 'Finir le TP 3', 'done': false},
        {'id' : 4, 'date': Date.now(), 'title': 'Finir le TP 4', 'done': false},
      ];
    }

    $scope.removeTodo = function(todo) {
      var index = $scope.todoList.indexOf(todo);
      $scope.todoList.splice(index, 1);
    };

    $scope.addTodo = function() {
      if (!$scope.newTodo) {
        return ;
      }

      var id = 0;
      for (var i = 0 ; i < $scope.todoList.length ; i++) {
        id = Math.max($scope.todoList[i].id, id);
      }
      id += 1;

      var todo = {
        'id': id,
        'date': Date.now(),
        'title': $scope.newTodo,
        'done': false,
      };
      $scope.todoList.push(todo);
    };
  });


app.controller('TodoController', function($scope, $routeParams) {
  var id = $routeParams.id;
  $scope.todo = {};

  for (var i = 0; i < $scope.todoList.length; i++) {
    if ($scope.todoList[i].id == id) {
      $scope.todo = $scope.todoList[i];
      break ;
    }
  }
});
