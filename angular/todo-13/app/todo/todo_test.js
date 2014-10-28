describe('TodoModule', function() {
  describe('TodoService', function() {
    var TodoService;

    beforeEach(module('myApp.todo'));

    beforeEach(inject(function(_TodoService_) {
      TodoService = _TodoService_;
    }));

    it('should have a default todoList', function() {
      expect(TodoService.getTodoList()).toBeDefined();
      expect(TodoService.getTodoList().length).toEqual(4);
    });

    it('should have a getTodo', function() {
      var todo = TodoService.getTodo(1);
      expect(todo).toBeDefined();
      expect(todo.title).toEqual('Finir le TP 1');
    });

    it('should have a addTodo', function() {
      TodoService.addTodo('Add testing');
      expect(TodoService.getTodoList().length).toEqual(5);
    });

    it('should have a removeTodo', function() {
      var todo = TodoService.getTodo(1);
      TodoService.removeTodo(todo);
      expect(TodoService.getTodoList().length).toEqual(3);
    });
  });

  describe('TodoController', function() {
    var scope, TodoController, routeParamsMock;

    beforeEach(module('myApp.todo'));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      routeParamsMock = {id: 1};
      TodoListController = $controller('TodoController', {
        $scope: scope,
        $routeParams: routeParamsMock,
      });
    }));

    it('should have a todo', function() {
      expect(scope.todo).toBeDefined();
      expect(scope.todo.title).toEqual('Finir le TP 1');
      expect(scope.todo.done).toEqual(true);
    });
  });

  describe('TodoListController', function() {
    var scope, TodoListController;

    beforeEach(module('myApp.todo'));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      TodoListController = $controller('TodoListController', {$scope: scope});
    }));

    it('should have a todoList', function() {
      expect(scope.todoList).toBeDefined();
    });
  });
});
