var vdom = require('virtual-dom')
var mainloop = require('main-loop')
var state = require('./lib/state')
var render = require('./render')
var Delegator = require('dom-delegator')
Delegator()

var app = {}
app.state = state()
app.state.actions = Object.keys(app.state.actions)
  .reduce(delegateActions, {})

function delegateActions(hash, fn) {
  hash[fn] = Delegator
    .allocateHandle(app.state.actions[fn].bind(null, app.state))
  return hash
}

var loop = mainloop(app.state(), render, {
  create: vdom.create,
  diff: vdom.diff,
  patch: vdom.patch
})

app.state(loop.update)

document.body.appendChild(loop.target)
