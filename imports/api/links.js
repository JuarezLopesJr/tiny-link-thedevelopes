import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

Meteor.methods({
  'links.insert': function (url) {

    if (!this.userId) {
      throw new Meteor.Error(401, 'Access Denied! User not logged!')
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link', // custom error message to SimpleSchema
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })

    return Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },

  'links.setVisibility': function (_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'Access Denied! User not logged!')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible })

    return Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    })
  },

  'links.trackVisit': function (_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })

    return Links.update({ _id }, {
      $inc: {
        visitedCount: 1
      },
      $set: {
        lastVisitedAt: new Date().getTime()
      }
    })
  }

})



export const Links = new Mongo.Collection('links')
