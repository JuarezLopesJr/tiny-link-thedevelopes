import React, { Component } from 'react'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'

class LinksListFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showVisible: true
    }

  }

  componentDidMount() {
    this.linksFilterTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    })
  }

  componentWillUnmount() {
    this.linksFilterTracker.stop()
  }


  render() {
    return (
      <div>
        <label className='checkbox'>
          <input
            className='checkbox__box'
            type='checkbox' checked={ !this.state.showVisible }
            onChange={ (e) => {
              Session.set('showVisible', !e.target.checked)
            }}/>
          show hidden links
        </label>
      </div>
    )
  }
}

export default LinksListFilter
