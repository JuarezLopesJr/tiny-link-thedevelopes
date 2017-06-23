import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import SignUp from '../components/SignUp'
import Link from '../components/Link'
import  Login  from '../components/Login'
import NotFound from '../components/NotFound'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

// Set the onEnter in the <Route> as method and call this function
// this function is a long form of using browserHistory.replace() and avoiding
// the use of the browser's back button, but is best to use browserHistory.replace
// const onPublicPage = () => {
//   if (Meteor.userId()) {
//     browserHistory.push('/links')
//   }
// }

// this function makes all validation without the onEnter props
export const onAuthChange = (isAuthenticated) => {
  const { pathname } = browserHistory.getCurrentLocation()
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/')
  }
}

export const routes = (
  <Router history={ browserHistory }>
    <Route path='/' component={ Login }/>
    <Route path='/signup' component={ SignUp }/>
    <Route path='/links' component={ Link } />
    <Route path='*' component={ NotFound } />
  </Router>
)
