var h = require('virtual-dom').h
var cuid = require('cuid')
var Observ = require('observ')

module.exports = task

function task(state) {
  state = state || {}
  return {
    id: state.id || cuid(),
    title: Observ(state.title || ''),
    completed: Observ(Boolean(state.completed) || false),
  }
}

task.render = function render(state, actions) {
  return h('li', {
    key: state.id,
  }, [
    h('button', {
      onclick: actions.removeTask.bind(null, state.id),
    }, 'Remove'),
    ' ',
    state.title()
  ])
}
