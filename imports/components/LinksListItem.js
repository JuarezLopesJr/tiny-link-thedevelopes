import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClipBoard from 'clipboard'
import { Tracker } from 'meteor/tracker'
import moment from 'moment'


class LinksListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      justCopied: false
    }
  }

  componentDidMount() {
    this.clipboard = new ClipBoard(this.refs.copy)

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true })

      setTimeout(() => {
        this.setState({ justCopied: false })
      }, 1000)

    }).on('error', () => {
      alert('Something went wrong :(')
    })
  }


  componentWillUnmount() {
    this.clipboard.destroy()
  }

  renderStats() {
    const { visitedCount, lastVisitedAt } = this.props
    const visitMessage = visitedCount === 1 ? 'visit' : 'visits'
    let visitedMessage = null

    if (typeof lastVisitedAt === 'number') {
      visitedMessage = `(visited ${ moment(lastVisitedAt).fromNow()})`
    }
    return (
      <p className='item__message'>{ visitedCount } { visitMessage } { visitedMessage }</p>
    )
  }

  render() {
    const { _id, url, userId, shortUrl, visible,
            visitedCount, lastVisitedAt } = this.props

    return (
      <div className='item'>
        <h2>{ url }</h2>
        <p className='item__message'>{ shortUrl }</p>
        { this.renderStats() }
        <a className='button button--pill button--link' href={ shortUrl } target='_blank'>Go</a>
        <button
          className='button button--pill'
          ref='copy'
          data-clipboard-text={ shortUrl }>
          { this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className='button button--pill' onClick={ () => {
          Meteor.call('links.setVisibility', _id, !visible)
        }}>
          { visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}

export default LinksListItem
