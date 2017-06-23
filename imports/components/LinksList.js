import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'

import LinksListItem from './LinksListItem'

class LinksList extends Component {
  constructor(props) {
    super(props)

  }

  renderLinksList() {
    if (this.props.links.length === 0) {
      return (
        <div className='item'>
          <p className='item__status-message'>No links found, add link to start</p>
        </div>
      )
    }

    return this.props.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id)
      return (
        <LinksListItem key={ link._id } shortUrl={ shortUrl } { ...link } />
      )
    })
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={ true }>
          { this.renderLinksList() }
        </FlipMove>
      </div>
    )
  }
}

LinksList.propTypes = {
  links: PropTypes.array.isRequired
}

export default LinksList
