'use strict'

var test = require('tape')
var task = require('.')

test('task', function (t) {
  t.plan(4)
  t.ok(task().hasOwnProperty('id'), 'has a `.id` property')
  t.ok(task().hasOwnProperty('title'), 'has a `.title` property')
  t.ok(task().hasOwnProperty('completed'), 'has a `.completed` property')
  t.ok(task.hasOwnProperty('render'), 'has a `#render` method')
  t.end()
})

test('task.id', function (t) {
  t.plan(2)
  t.notEqual(task().id, null, 'assigns a default ID')
  t.equal(task({ id: 'f00' }).id, 'f00', 'can be set')
  t.end()
})

test('task.title', function (t) {
  t.plan(3)
  t.equal(task().title(), '', 'defaults to an empty string')
  t.equal(task({ title: 'foo' }).title(), 'foo', 'can be set')
  t.equal(task().title.name, 'observable', 'returns an observable')
  t.end()
})

test('task.completed', function (t) {
  t.plan(4)
  t.equal(task().completed(), false, 'defaults to `false`')
  t.equal(task({ completed: false }).completed(), false, 'can be set to `false`')
  t.equal(task({ completed: true }).completed(), true, 'can be set to `true`')
  t.equal(task().completed.name, 'observable', 'returns an observable')
  t.end()
})

test('task#render', function (t) {
  t.plan(1)
  function noop() {}
  var actions = { removeTask: noop }
  var newTask = task.render(task(), actions)
  t.equal(newTask.tagName, 'LI', 'returns an `<li>`')
  t.end()
})
