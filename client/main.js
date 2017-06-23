import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { Links } from '../imports/api/links'
import '../imports/startup/simpl_schema_error_config'

import { routes, onAuthChange } from '../imports/routes/routes'

Tracker.autorun(() => {
  isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  Session.set('showVisible', true)
  ReactDOM.render(
    routes, document.querySelector('.app')
    )
  })
