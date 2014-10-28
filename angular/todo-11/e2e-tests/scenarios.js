'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('todoList', function() {
    var addInput = element(by.model('newTodo'));
    var addButton = element(by.css('button[ng-click="addTodo()"]'));
    var list = element.all(by.css('[ng-view] li'));

    var addTodo = function(title) {
      addInput.sendKeys(title);
      addButton.click();
    }

    beforeEach(function() {
      browser.get('index.html#/');
    });

    it('should render todoList when user navigates to /', function() {
      expect(list.count()).toEqual(4);
    });

    it('should add a todo when user click on add', function() {
      addTodo("Test");
      expect(list.count()).toEqual(5);
    });

    it('should remove a todo when user click on remove', function() {
      list.first().element(by.css('button[ng-click="removeTodo(todo)"]')).click();
      expect(list.count()).toEqual(3);
    });
  });

  describe('todo', function() {
    var title = element(by.css('[ng-view] h1'));

    beforeEach(function() {
      browser.get('index.html#/todo/1');
    });

    it('should render a single todo when user navigates to /todo/1', function() {
      expect(title.getText()).toEqual('Finir le TP 1');
    });

  });
});
