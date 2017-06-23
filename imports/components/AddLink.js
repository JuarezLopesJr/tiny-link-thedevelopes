import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

class AddLink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)

  }
// fire at every keystroke
  handleChange(e) {
    this.setState({ url: e.target.value.trim() })
  }
// fire on the submit action
  handleSubmit(e){
    e.preventDefault()
    const { url } = this.state

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose()
      } else {
        this.setState({ error: err.reason, url: '' })
      }
    })
  }

  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
      error: ''
    })
  }

  render() {
    return (
      <div>
        <button className='button' onClick={ () => this.setState({ isOpen: true })}>
          Add Link
        </button>
        <Modal
          isOpen={ this.state.isOpen }
          contentLabel='Add Link'
          onAfterOpen={ () => this.refs.url.focus()}
          onRequestClose={ this.handleModalClose }
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'>
          <h2>Add Link</h2>
          { this.state.error ? <p>{this.state.error}</p> : undefined }
          <form onSubmit={ this.handleSubmit } className='boxed-view__form' noValidate>
            <input
              ref='url'
              value={ this.state.url }
              // autoFocus
              type='text'
              placeholder='URL'
              onChange={ this.handleChange }/>
            <button className='button'>Add Link</button>
            <button type='button' className='button button--secondary' 
              onClick={ this.handleModalClose }>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}


export default AddLink

// Uncontrolled input fields require the use of ref, with a controlled input
// pass the value prop for type text and checked for radio buttons and checkbox
{/* <div>
  <h2>Add Link</h2>
  <form onSubmit={ this.handleSubmit } noValidate>
    <input autoFocus type='text' ref='url' placeholder='URL'/>
    <button>Add Link</button>
  </form>
</div> */}
