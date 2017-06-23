import React, { Component } from 'react'
import { Links } from '../api/links'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

import LinksList from './LinksList'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksListFilter from './LinksListFilter'

// i'm gonna pass links as props to LinksList
class Link extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
          <PrivateHeader />
          <div className='page-content'>
            <LinksListFilter />
            <AddLink/>
            <LinksList links={ this.props.links }/>
          </div>
      </div>

    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('links')
  return { links: Links.find({ visible: Session.get('showVisible')}).fetch()}
}, Link)
