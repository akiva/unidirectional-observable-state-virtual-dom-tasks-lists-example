'use strict'

var test = require('tape')
var taskList = require('.')
var task = require('../task')
var tasks = [ task(), task(), task() ]

test('taskList', function (t) {
  t.plan(4)
  t.ok(taskList().hasOwnProperty('id'), 'has a `.id` property')
  t.ok(taskList().hasOwnProperty('title'), 'has a `.title` property')
  t.ok(taskList().hasOwnProperty('tasks'), 'has a collection of tasks')
  t.ok(taskList.hasOwnProperty('render'), 'has a `#render` method')
  t.end()
})

test('taskList.id', function (t) {
  t.plan(2)
  t.notEqual(taskList().id, null, 'assigns a default ID')
  t.equal(taskList({ id: 'f00' }).id, 'f00', 'can be set')
  t.end()
})

test('taskList.title', function (t) {
  t.plan(3)
  t.equal(taskList().title.name, 'observable', 'returns an observable')
  t.equal(taskList().title(), '', 'defaults to an empty string')
  t.equal(taskList({ title: 'foo' }).title(), 'foo', 'can be set')
  t.end()
})

test('taskList.tasks', function (t) {
  t.plan(3)
  t.equal(taskList().tasks.name, 'observable', 'returns an observable')
  t.deepEqual(taskList().tasks(), [], 'defaults to an empty collection')
  t.deepEqual(taskList({ tasks: tasks }).tasks(), tasks, 'can be provided tasks state')
  t.end()
})

test('taskList#render', function (t) {
  t.plan(1)
  function noop() {}
  var actions = {
    addTaskToList: noop,
    removeTask: noop,
  }
  var tl = taskList.render(taskList(), actions)
  t.equal(tl.tagName, 'DIV', 'returns an `<div>`')
  t.end()
})
