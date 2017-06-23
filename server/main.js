import { Meteor } from 'meteor/meteor'
import { Links } from '../imports/api/links'
import '../imports/startup/simpl_schema_error_config'
// import '../imports/api/users'
import { WebApp } from 'meteor/webapp'

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })

    if (link) {
      res.statusCode = 302
      res.setHeader('Location', link.url)
      res.end()
      Meteor.call('links.trackVisit', _id)
    } else {
      next()
    }

  })
// shown ONLY links created by the logged user
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId })
    })
  })
