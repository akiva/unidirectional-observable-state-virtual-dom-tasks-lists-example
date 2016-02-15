var h = require('virtual-dom/h')
var taskList = require('./lib/task-list')

module.exports = render

function render(state) {
  return h('main', [
    h('h1', 'Task lists example ' + state.version),
    h('button#add-list', {
      onclick: state.actions.addList.bind(null, taskList()),
    }, 'Add a new task list'),
    h('div#lists', showTaskLists(state.lists, state.actions)),
    h('p', getTotalTasksRemainingMessage(state.lists))
  ])
}

function getTotalTasksRemainingMessage(lists) {
  var count = Object.keys(lists).reduce(function (sum, list) {
    return sum + lists[list].tasks.reduce(function (sum, task) {
      return ~~!task.completed() ? sum + 1 : sum
    }, 0)
  }, 0)
  var tasksForm = count === 1 ? 'task' : 'tasks'
  return [count, 'total', tasksForm, 'remaining.'].join(' ')
}

function showTaskLists(lists, actions) {
  var content = Object.keys(lists).map(function (id) {
    return taskList.render(lists[id], actions)
  })
  return content.length ? content : h('p', 'No tasks found. Why not create one?')
}
