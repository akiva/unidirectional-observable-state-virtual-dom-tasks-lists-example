var Observ = require('observ')
var ObservStruct = require('observ-struct')
var ObservVarhash = require('observ-varhash')
var version = require('../../package.json').version || ''

var actions = {
  addList: function addList(list) {
    return state.lists.put(list.id, list)
  },
  addTaskToList: function addTaskToList(listId, task) {
    return state.lists[listId].tasks.push(task)
  },
  removeTask: function removeTask(taskId) {
    return Object.keys(state.lists).some(function (list) {
      return state.lists[list].tasks.some(function (task, i) {
        if (task.id === taskId) {
          return state.lists[list].tasks.splice(i, 1)
        }
        return false
      })
    })
  },
}

var state = ObservStruct({
  version: Observ(version),
  lists: ObservVarhash({}),
  actions: actions,
})

module.exports = () => state
