var app = angular.module('myApp.todo', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'todo/partials/home.html',
      controller: 'TodoListController',
    })
    .when('/todo/:id', {
      templateUrl: 'todo/partials/todo.html',
      controller: 'TodoController',
    })
    .otherwise({redirectTo: '/'});
}]);

app.controller('TodoListController', ['$scope', 'TodoService', function($scope, TodoService) {
  $scope.filterText = "";
  $scope.filterDone = {done: ""};
  $scope.todoList = TodoService.getTodoList();

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo);
  };

  $scope.addTodo = function() {
    TodoService.addTodo($scope.newTodo);
  };
}]);

app.controller('TodoController', ['$scope', '$routeParams', 'TodoService', function($scope, $routeParams, TodoService) {
  var id = $routeParams.id;
  $scope.todo = TodoService.getTodo(id);
}]);

app.factory('TodoService', function(){
  var todoList = [
      {'id' : 1, 'date': Date.now(), 'title': 'Finir le TP 1', 'done': true},
      {'id' : 2, 'date': Date.now(), 'title': 'Finir le TP 2', 'done': false},
      {'id' : 3, 'date': Date.now(), 'title': 'Finir le TP 3', 'done': false},
      {'id' : 4, 'date': Date.now(), 'title': 'Finir le TP 4', 'done': false},
    ];

  return {
    todoList: todoList,

    getTodoList: function(){
      return todoList;
    },

    getTodo: function(id) {
      for (var i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id == id) {
          return this.todoList[i];
        }
      }
    },

    removeTodo: function(todo) {
      var index = this.todoList.indexOf(todo);
      this.todoList.splice(index, 1);
    },

    addTodo: function(newTodo) {
      if (!newTodo) {
        return ;
      }

      var id = 0;
      for (var i = 0 ; i < this.todoList.length ; i++) {
        id = Math.max(this.todoList[i].id, id);
      }
      id += 1;

      var todo = {
        'id': id,
        'date': Date.now(),
        'title': newTodo,
        'done': false,
      };
      this.todoList.push(todo);
    },
  }
});

app.directive('todo', function() {
  return {
    restrict: 'E',
    templateUrl: 'todo/partials/todo_directive.html',
    scope: {
      'dateFormat': '=dateFormat',
      'todo': '=',
    }
  };
});
