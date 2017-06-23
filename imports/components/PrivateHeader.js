import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'


export default () => {
  return (
    <div className='header'>
      <div className='header__content'>
        <h2 className='header__title'>Tiny Link</h2>
        <button className='button button--link-text' onClick={ () => Accounts.logout() }>Logout</button>
      </div>
    </div>
  )
}
