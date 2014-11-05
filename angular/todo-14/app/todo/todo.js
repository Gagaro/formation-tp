var app = angular.module('myApp.todo', ['gettext', 'ui.router']);

app.config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('todo', {
      url: "",
      templateUrl: 'todo/partials/home.html',
      controller: 'TodoListController',
    })
    .state('todo.detail', {
      url: '/todo/:id',
      templateUrl: 'todo/partials/todo.html',
      controller: 'TodoController',
    });
}]);

app.controller('TodoListController', ['$scope', 'TodoService', 'gettextCatalog', function($scope, TodoService, gettextCatalog) {
  $scope.filterText = "";
  $scope.filterDone = {done: ""};
  $scope.todoList = TodoService.getTodoList();

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo);
  };

  $scope.addTodo = function() {
    TodoService.addTodo($scope.newTodo);
  };

  $scope.changeLanguage = function(lang) {
    gettextCatalog.setCurrentLanguage(lang);
  };
}]);

app.controller('TodoController', ['$scope', '$stateParams', 'TodoService', function($scope, $stateParams, TodoService) {
  var id = $stateParams.id;
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
