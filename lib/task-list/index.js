var h = require('virtual-dom').h
var cuid = require('cuid')
var Observ = require('observ')
var ObservVarhash = require('observ-varhash')
var ObservArray = require('observ-array')
var bogan = require('boganipsum')
var task = require('../task')

module.exports = taskList

function taskList(state) {
  state = state || {}
  return ObservVarhash({
    id: state.id || cuid(),
    title: Observ(state.title || ''),
    tasks: ObservArray(state.tasks || []),
  })
}

taskList.render = function render(state, actions) {
  return h('div', {
    key: state.id,
  }, [
    h('button', {
      onclick: actions.addTaskToList.bind(null, state.id, task({
        title: bogan({ paragraphs: 1, sentenceMin: 1, sentenceMax: 1 })
      })),
    }, 'Add new task'),
    state.tasks.length ?
      h('ul', state.tasks.map(function (t) {
        return task.render(t, actions)
      })) :
      '',
    h('p', getTasksRemainingMessage(state.tasks)),
  ])
}

function getTasksRemainingMessage(tasks) {
  var count = tasks.length
  var tasksForm = count === 1 ? 'task' : 'tasks'
  return [count, tasksForm, 'remaining.'].join(' ')
}
